export default interface IResponseAccountLogin extends JSON {
  created_at: number;
  token_type: "bearer";
  access_token: string;
  expires_in: number;
}
