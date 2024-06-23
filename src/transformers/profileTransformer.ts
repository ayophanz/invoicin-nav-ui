/* ============
 * Profile Transformer
 * ============
 *
 * The transformer for the profile.
 */

import Transformer from "./transformer";
import { ProfileTransformerFetch } from "../types/profileTransformerFetch";
import { ProfileTransformerSend } from "../types/profileTransformerSend";

export default class ProfileTransformer extends Transformer {
  static fetch(item: ProfileTransformerFetch) {
    return {
      firstname: item.first_name,
      lastname: item.last_name,
      image: item.image,
      email: item.email,
      role: item.role,
    };
  }

  static send(item: ProfileTransformerSend) {
    return {
      first_name: item.firstname,
      last_name: item.lastname,
      image: item.image,
      email: item.email,
      role: item.role,
    };
  }
}
