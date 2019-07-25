export default interface IRequestAccountLogin extends JSON {
  provider: "email" | "facebook" | "line",
  email?: string; // required if email login
  password?: string; // required if email login
  uid?: string; // required if facebook or line login
}
