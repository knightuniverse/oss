"use server";

import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

const COOKIE_NAME = "oss";
const COOKIE_PASSWORD = "YFQN6oRPZqpg3irDWAT3j38F2wv5xyky";

class Session {
  static async create() {
    const session = await getIronSession<Record<string, string>>(cookies(), {
      password: COOKIE_PASSWORD,
      cookieName: COOKIE_NAME,
      cookieOptions: {
        httpOnly: false,
        secure: false,
      },
      ttl: 28800, // 8h in seconds
    });
    return session;
  }
}

export { Session };
