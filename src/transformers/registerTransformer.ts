/* ============
 * Register Transformer
 * ============
 *
 * The transformer for the OTP.
 */

import Transformer from './transformer';

export default class RegisterTransformer extends Transformer {

  static fetch(item: any) {
    return {
      image: item.image,
      firstname: item.firstname,
      lastname: item.lastname,
      email: item.email,
      password: item.password,
      passwordConfirmation: item.password_confirmation,
      logo: item.logo,
      orgName: item.org_name, 
      orgEmail: item.org_email,
      country: item.country,
      stateProvince: item.state_province, 
      city: item.city,
      zipcode: item.zipcode,
      address: item.address,
      type: item.type,
    };
  }

  static send(item: any) {
    return {
      image: item.image,
      firstname: item.firstname,
      lastname: item.lastname,
      email: item.email,
      password: item.password,
      password_confirmation: item.passwordConfirmation,
      logo: item.logo,
      org_name: item.orgName, 
      org_email: item.orgEmail,
      country: item.country,
      state_province: item.stateProvince, 
      city: item.city,
      zipcode: item.zipcode,
      address: item.address,
      type: item.type,
    };
  }
}