/* ============
 * Me Transformer
 * ============
 *
 * The transformer for the me.
 */

import Transformer from "./transformer";
import { MeTransformerFetch } from "../types/meTransformerFetch";

export default class MeTransformer extends Transformer {
  static fetch(item: MeTransformerFetch) {
    return {
      id: item.id,
      firstname: item.first_name,
      lastname: item.last_name,
      email: item.email,
      emailVerifiedAt: item.email_verified_at,
      roles: item.roles,
      permissions: item.permissions,
      defaultImage: item.default_image,
      image: item.image,
      type: item.type,
      is2faEnable: item.is2fa_enable,
      defaultLogo: item.organization
        ? item.organization.default_logo
        : {
            initial: "",
            bg_color: "",
          },
      logo: item.organization ? item.organization.logo : "",
      organizationUuid: item.organization ? item.organization.uuid : "",
      organizationName: item.organization ? item.organization.name : "",
      organizationEmail: item.organization ? item.organization.email : "",
      organizationEmailVerifiedAt: item.organization
        ? item.organization.email_verified_at
        : "",
      addresses: item.addresses,
    };
  }
}
