import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/lib/auth";

// Next 16 renamed `middleware.ts` to `proxy.ts`. Only one proxy file is
// supported and it must sit next to `app/` (here: `src/proxy.ts`).
export async function proxy(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      const signInUrl = new URL("/signin", request.url);
      signInUrl.searchParams.set(
        "callbackURL",
        `${request.nextUrl.pathname}${request.nextUrl.search}`
      );

      return NextResponse.redirect(signInUrl);
    }
  } catch (error) {
    // Never lock the user out because of a transient database error; the
    // protected pages re-check the session on the client anyway.
    console.error("Proxy session check failed:", error);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/profile/edit"],
};
