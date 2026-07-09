import { auth } from "../../auth/auth";
import { ProfilesService } from "../profiles/profiles.service";

export class AuthService {
  constructor(private profilesService = new ProfilesService()) {}

  async signUp(input: { email: string; password: string; name: string }) {
    console.log("Starting signup");

    const result = await auth.api.signUpEmail({
      body: {
        email: input.email,
        password: input.password,
        name: input.name,
      },
    });

    try {
      console.log("User created:", result.user);

      try {
        await this.profilesService.createDefaultProfile(result.user.id);
      } catch (error) {
        console.error("CREATE PROFILE ERROR:", error);
        throw error;
      }

      console.log("Profile created");
    } catch (error) {
      console.error("Profile creation failed", error);
      throw error;
    }
    return result.user;
  }
  async getSessionFromHeaders(headers: Headers) {
    return auth.api.getSession({ headers });
  }

  /*
  sign-in
  Find user
      │
Compare password
      │
Create new session
      │
Store session
      │
Set cookie
      │
Return user
  */

  /*
auth/me

Cookie
    │
Authenticate
    │
Find session
    │
Return current user

The frontend calls this after a page refresh to determine whether the user is still logged in.
*/

  /*
sign-out
Delete session
      │
Clear cookie
      │
Return success

*/
}