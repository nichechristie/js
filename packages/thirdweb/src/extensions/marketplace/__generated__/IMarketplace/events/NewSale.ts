import type { AbiParameterToPrimitiveType } from "abitype";
import { prepareEvent } from "../../../../../event/prepare-event.js";

/**
 * Represents the filters for the "NewSale" event.
 */
export type NewSaleEventFilters = Partial<{
  listingId: AbiParameterToPrimitiveType<{
    type: "uint256";
    name: "listingId";
    indexed: true;
  }>;
  assetContract: AbiParameterToPrimitiveType<{
    type: "address";
    name: "assetContract";
    indexed: true;
  }>;
  lister: AbiParameterToPrimitiveType<{
    type: "address";
    name: "lister";
    indexed: true;
  }>;
}>;

/**
 * Creates an event object for the NewSale event.
 * @param filters - Optional filters to apply to the event.
 * @returns The prepared event object.
 * @extension MARKETPLACE
 * @example
 * ```ts
 * import { getContractEvents } from "thirdweb";
 * import { newSaleEvent } from "thirdweb/extensions/marketplace";
 *
 * const events = await getContractEvents({
 * contract,
 * events: [
 *  newSaleEvent({
 *  listingId: ...,
 *  assetContract: ...,
 *  lister: ...,
 * })
 * ],
 * });
 * ```
 */
export function newSaleEvent(filters: NewSaleEventFilters = {}) {
  return prepareEvent({
    filters,
    signature:
      "event NewSale(uint256 indexed listingId, address indexed assetContract, address indexed lister, address buyer, uint256 quantityBought, uint256 totalPricePaid)",
  });
}
