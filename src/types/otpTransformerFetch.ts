export type OtpTransformerFetch = {
  otp_code: string;
  token: string;
  token_type: string;
  expires_in: string;
  user_id: number;
  otp_setup_required: boolean;
};
