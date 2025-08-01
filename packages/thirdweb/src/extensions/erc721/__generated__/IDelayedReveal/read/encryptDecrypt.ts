import type { AbiParameterToPrimitiveType } from "abitype";
import { decodeAbiParameters } from "viem";
import { readContract } from "../../../../../transaction/read-contract.js";
import type { BaseTransactionOptions } from "../../../../../transaction/types.js";
import { encodeAbiParameters } from "../../../../../utils/abi/encodeAbiParameters.js";
import { detectMethod } from "../../../../../utils/bytecode/detectExtension.js";
import type { Hex } from "../../../../../utils/encoding/hex.js";

/**
 * Represents the parameters for the "encryptDecrypt" function.
 */
export type EncryptDecryptParams = {
  data: AbiParameterToPrimitiveType<{ type: "bytes"; name: "data" }>;
  key: AbiParameterToPrimitiveType<{ type: "bytes"; name: "key" }>;
};

export const FN_SELECTOR = "0xe7150322" as const;
const FN_INPUTS = [
  {
    name: "data",
    type: "bytes",
  },
  {
    name: "key",
    type: "bytes",
  },
] as const;
const FN_OUTPUTS = [
  {
    name: "result",
    type: "bytes",
  },
] as const;

/**
 * Checks if the `encryptDecrypt` method is supported by the given contract.
 * @param availableSelectors An array of 4byte function selectors of the contract. You can get this in various ways, such as using "whatsabi" or if you have the ABI of the contract available you can use it to generate the selectors.
 * @returns A boolean indicating if the `encryptDecrypt` method is supported.
 * @extension ERC721
 * @example
 * ```ts
 * import { isEncryptDecryptSupported } from "thirdweb/extensions/erc721";
 * const supported = isEncryptDecryptSupported(["0x..."]);
 * ```
 */
export function isEncryptDecryptSupported(availableSelectors: string[]) {
  return detectMethod({
    availableSelectors,
    method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS] as const,
  });
}

/**
 * Encodes the parameters for the "encryptDecrypt" function.
 * @param options - The options for the encryptDecrypt function.
 * @returns The encoded ABI parameters.
 * @extension ERC721
 * @example
 * ```ts
 * import { encodeEncryptDecryptParams } from "thirdweb/extensions/erc721";
 * const result = encodeEncryptDecryptParams({
 *  data: ...,
 *  key: ...,
 * });
 * ```
 */
export function encodeEncryptDecryptParams(options: EncryptDecryptParams) {
  return encodeAbiParameters(FN_INPUTS, [options.data, options.key]);
}

/**
 * Encodes the "encryptDecrypt" function into a Hex string with its parameters.
 * @param options - The options for the encryptDecrypt function.
 * @returns The encoded hexadecimal string.
 * @extension ERC721
 * @example
 * ```ts
 * import { encodeEncryptDecrypt } from "thirdweb/extensions/erc721";
 * const result = encodeEncryptDecrypt({
 *  data: ...,
 *  key: ...,
 * });
 * ```
 */
export function encodeEncryptDecrypt(options: EncryptDecryptParams) {
  // we do a "manual" concat here to avoid the overhead of the "concatHex" function
  // we can do this because we know the specific formats of the values
  return (FN_SELECTOR +
    encodeEncryptDecryptParams(options).slice(
      2,
    )) as `${typeof FN_SELECTOR}${string}`;
}

/**
 * Decodes the result of the encryptDecrypt function call.
 * @param result - The hexadecimal result to decode.
 * @returns The decoded result as per the FN_OUTPUTS definition.
 * @extension ERC721
 * @example
 * ```ts
 * import { decodeEncryptDecryptResult } from "thirdweb/extensions/erc721";
 * const result = decodeEncryptDecryptResultResult("...");
 * ```
 */
export function decodeEncryptDecryptResult(result: Hex) {
  return decodeAbiParameters(FN_OUTPUTS, result)[0];
}

/**
 * Calls the "encryptDecrypt" function on the contract.
 * @param options - The options for the encryptDecrypt function.
 * @returns The parsed result of the function call.
 * @extension ERC721
 * @example
 * ```ts
 * import { encryptDecrypt } from "thirdweb/extensions/erc721";
 *
 * const result = await encryptDecrypt({
 *  contract,
 *  data: ...,
 *  key: ...,
 * });
 *
 * ```
 */
export async function encryptDecrypt(
  options: BaseTransactionOptions<EncryptDecryptParams>,
) {
  return readContract({
    contract: options.contract,
    method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS] as const,
    params: [options.data, options.key],
  });
}
