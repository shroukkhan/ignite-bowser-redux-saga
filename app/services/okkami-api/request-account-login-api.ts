import IRequestAccountLogin from "./request-account-login"

export default interface IRequestAccountLoginApi extends IRequestAccountLogin {
  client_id: string;
  client_secret: string;
  grant_type: "password" | "client_credentials";
  brand_id: number;
  lat: number;
  lng: number;
  app_version: string,
  platform: "ios" | "android"
}
