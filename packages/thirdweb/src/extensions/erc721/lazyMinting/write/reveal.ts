import type { BaseTransactionOptions } from "../../../../transaction/types.js";
import { reveal as generatedReveal } from "../../__generated__/IDelayedReveal/write/reveal.js";
import { hashDelayedRevealPassword } from "../helpers/hashDelayedRevealBatch.js";

export { isRevealSupported } from "../../__generated__/IDelayedReveal/write/reveal.js";

/**
 * @extension ERC721
 */
export type RevealParams = {
  batchId: bigint;
  password: string;
};

/**
 * Reveals a previously lazy minted batch of NFTs.
 * This method is only available on the `DropERC721` contract.
 * @param options {RevealParams} - The reveal parameters.
 * @param options.batchId {number} - The ID of the batch to reveal. Get this by calling `getBatchesToReveal`. {@see getBatchesToReveal}
 * @param options.password {string} - The password for the reveal, set when the batch was created. {@see createDelayedRevealBatch}
 * @param options.contract {@link ThirdwebContract} - The NFT contract instance.
 *
 * @returns The prepared transaction to send.
 *
 * @extension ERC721
 * @example
 * ```ts
 * import { reveal } from "thirdweb/extensions/erc721";
 *
 * const transaction = await reveal({ contract: contract, batchId: 0, password: "password" });
 *
 * const { transactionHash } = await sendTransaction({ transaction, account });
 * ```
 */
export function reveal(options: BaseTransactionOptions<RevealParams>) {
  if (!options.password) {
    throw new Error("Password is required");
  }

  return generatedReveal({
    asyncParams: async () => {
      const key = await hashDelayedRevealPassword(
        options.batchId,
        options.password,
        options.contract,
      );
      return {
        identifier: options.batchId,
        key,
      };
    },
    contract: options.contract,
  });
}
