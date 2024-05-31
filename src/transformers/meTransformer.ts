/* ============
 * Me Transformer
 * ============
 *
 * The transformer for the me.
 */

import Transformer from "./transformer";

export default class MeTransformer extends Transformer {
  static fetch(item: any) {
    return {
      id: item.id,
      firstname: item.first_name,
      lastname: item.last_name,
      email: item.email,
      emailVerifiedAt: item.email_verified_at,
      roles: item.roles,
      image: item.image,
      type: item.type,
      is2faEnable: item.is2fa_enable,
      organizationUuid: item.organization_uuid,
      organizationName: item.organization_name,
      organizationEmail: item.organization_email,
      organizationEmailVerifiedAt: item.organization_email_verified_at,
      addresses: item.addresses,
    };
  }
}
