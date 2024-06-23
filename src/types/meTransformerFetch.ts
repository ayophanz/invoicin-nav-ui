export type MeTransformerFetch = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  email_verified_at: string;
  roles: string[];
  permissions: string[];
  default_image: { initial: string; bg_color: string };
  image: string;
  type: string;
  is2fa_enable: boolean;
  organization: {
    default_logo: { initial: string; bg_color: string };
    logo: string;
    uuid: string;
    name: string;
    email: string;
    email_verified_at: string;
  };
  addresses: object[];
};
