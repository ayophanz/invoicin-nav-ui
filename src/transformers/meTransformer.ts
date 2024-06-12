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
      defaultImage: item.default_image,
      image: item.image,
      type: item.type,
      is2faEnable: item.is2fa_enable,
      defaultLogo: item.organization.default_logo ?? null,
      logo: item.organization.logo ?? null,
      organizationUuid: item.organization.uuid ?? null,
      organizationName: item.organization.name ?? null,
      organizationEmail: item.organization.email ?? null,
      organizationEmailVerifiedAt: item.organization.email_verified_at ?? null,
      addresses: item.addresses,
    };
  }
}
