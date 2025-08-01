import type { Address } from "abitype";
import type {
  BaseTransactionOptions,
  WithOverrides,
} from "../../../transaction/types.js";
import type { Prettify } from "../../../utils/type-utils.js";
import { toUnits } from "../../../utils/units.js";
import { transferFrom as generatedTransferFrom } from "../__generated__/IERC20/write/transferFrom.js";

/**
 * Represents the parameters for the `transferFrom` function.
 * @extension ERC20
 */
export type TransferFromParams = Prettify<
  WithOverrides<
    { to: Address; from: Address } & (
      | {
          amount: number | string;
        }
      | {
          amountWei: bigint;
        }
    )
  >
>;

/**
 * Transfers a specified amount of tokens from one address to another address on the ERC20 contract.
 * @param options - The transaction options including from, to, amount, and gas price.
 * @returns A promise that resolves to the prepared transaction object.
 * @extension ERC20
 * @example
 * ```ts
 * import { transferFrom } from "thirdweb/extensions/erc20";
 * import { sendTransaction } from "thirdweb";
 *
 * const transaction = transferFrom({
 *  contract: USDC_CONTRACT,
 *  from: "0x1234...",
 *  to: "0x5678...",
 *  amount: 100,
 * });
 *
 * await sendTransaction({ transaction, account });
 * ```
 */
export function transferFrom(
  options: BaseTransactionOptions<TransferFromParams>,
) {
  return generatedTransferFrom({
    asyncParams: async () => {
      let amount: bigint;
      if ("amount" in options) {
        // if we need to parse the amount from ether to gwei then we pull in the decimals extension
        const { decimals } = await import("../read/decimals.js");
        // if this fails we fall back to `18` decimals
        const d = await decimals(options).catch(() => 18);
        // turn ether into gwei
        amount = toUnits(options.amount.toString(), d);
      } else {
        amount = options.amountWei;
      }
      return {
        from: options.from,
        overrides: {
          erc20Value: {
            amountWei: amount,
            tokenAddress: options.contract.address,
          },
          ...options.overrides,
        },
        to: options.to,
        value: amount,
      } as const;
    },
    contract: options.contract,
  });
}
