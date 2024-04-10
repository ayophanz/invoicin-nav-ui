/* ============
 * Enable 2FA Transformer
 * ============
 *
 * The transformer for the enable 2fa.
 */

import Transformer from './transformer';

export default class Enable2faTransformer extends Transformer {

  static fetch(item: any) {
    return {
      otpCode: item.otp_code,
    };
  }

  static send(item: any) {
    return {
      otp_code: item.otpCode,
    };
  }
}