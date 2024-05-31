/* ============
 * OTP Transformer
 * ============
 *
 * The transformer for the OTP.
 */

import Transformer from './transformer';

export default class OtpTransformer extends Transformer {

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