import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// import Crypto from "crypto";
// import { unsealData } from "iron-session";
import { getIronSession } from "iron-session/edge";

// import { sessionOptions } from "lib/session";
// import { NextRequest, NextResponse } from "next/server";

// Crypto.timingSafeEqual = function timingSafeEqual(a, b) {
//   if (!Buffer.isBuffer(a)) {
//     throw new TypeError("First argument must be a buffer");
//   }
//   if (!Buffer.isBuffer(b)) {
//     throw new TypeError("Second argument must be a buffer");
//   }
//   if (a.length !== b.length) {
//     throw new TypeError("Input buffers must have the same length");
//   }
//   const len = a.length;
//   let out = 0;
//   let i = -1;
//   while (++i < len) {
//     out |= a[i]! ^ b[i]!;
//   }
//   return out === 0;
// };

// const handler = async (req: NextRequest) => {
//   const ironSessionCookie = req.cookies["iron-session/examples/next.js"];

//   if (!ironSessionCookie) {
//     console.log("No cookie found!");
//     return NextResponse.next();
//   }

//   // Session data now returns {} without errors or warnings, correct and incorrect passwords both return {}.
//   const sessionData = await unsealData(ironSessionCookie, sessionOptions);

//   console.log(sessionData);

//   return NextResponse.next();
// };

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const ironSessionCookie = request.cookies.get("myapp_cookiename")?.value;
  if (!ironSessionCookie) {
    console.log("No cookie found!");
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  const res = NextResponse.next();
  const session = await getIronSession(request, res, {
    cookieName: "myapp_cookiename",
    password: "complex_password_at_least_32_characters_long",
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  });

  console.log(session);

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/dashboard/:path*",
};
