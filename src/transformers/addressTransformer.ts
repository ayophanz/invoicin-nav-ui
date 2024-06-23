/* ============
 * Address Transformer
 * ============
 *
 * The transformer for the OTP.
 */

import Transformer from "./transformer";
import { AddressTransformerFetch } from "../types/addressTransformerFetch";
import { AddressTransformerSend } from "../types/addressTransformerSend";

export default class AddressTransformer extends Transformer {
  static fetch(item: AddressTransformerFetch) {
    return {
      type: item.type,
      country: item.country,
      stateProvince: item.state_province,
      city: item.city,
      zipcode: item.zipcode,
      address: item.address,
    };
  }

  static send(item: AddressTransformerSend) {
    return {
      type: item.type,
      country: item.country,
      state_province: item.stateProvince,
      city: item.city,
      zipcode: item.zipcode,
      address: item.address,
    };
  }
}
