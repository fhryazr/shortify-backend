import { auth } from "../../lib/auth";

export class AuthService {

  async signUp(fullname: string, email: string, password: string) {
    const data = await auth.api.signUpEmail({
      body: {
        name: fullname,
        email: email,
        password: password
      }
    })

    return data.user;
  }

  async signIn(email: string, password: string) {
    const data = await auth.api.signInEmail({
      body: {
        email: email,
        password: password
      }
    })
    return data.token;
  }
}