import { createAuthClient } from "better-auth/react";

// No `baseURL` here on purpose: the client then talks to the same origin it is
// served from ("/api/auth"), so the app keeps working on any dev port and the
// session cookie is always first-party.
export const authClient = createAuthClient();

export const { signIn, signUp, signOut, useSession, updateUser } = authClient;
