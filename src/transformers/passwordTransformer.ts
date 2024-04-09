/* ============
 * Password Transformer
 * ============
 *
 * The transformer for the password.
 */

import Transformer from './transformer';

export default class PasswordTransformer extends Transformer {

  static fetch(item: any) {
    return {
      currentPassword: item.current_password,
      newPassword: item.new_password,
      confirmPassword: item.confirm_password,
    };
  }

  static send(item: any) {
    return {
      current_password: item.currentPassword,
      new_password: item.newPassword,
      confirm_password: item.confirmPassword,
    };
  }
}