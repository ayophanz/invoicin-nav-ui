/* ============
 * OTP Transformer
 * ============
 *
 * The transformer for the OTP.
 */

import Transformer from "./transformer";
import { OtpTransformerFetch } from "../types/otpTransformerFetch";
import { OtpTransformerSend } from "../types/otpTransformerSend";

export default class OtpTransformer extends Transformer {
  static fetch(item: OtpTransformerFetch) {
    return {
      otpCode: item.otp_code,
      token: item.token,
      tokenType: item.token_type,
      expiresIn: item.expires_in,
      userId: item.user_id,
      otpSetupRequired: item.otp_setup_required,
    };
  }
  static send(item: OtpTransformerSend) {
    return {
      otp_code: item.otpCode,
    };
  }
}
