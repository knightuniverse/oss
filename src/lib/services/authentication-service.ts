"use server";

import { cache } from "@/lib/cache";
import { CK_TOKEN, SK_SUB } from "@/lib/constants";
import { api } from "@/lib/http";
import { Session } from "@/lib/session";
import { isEmpty, isNil, isString } from "lodash-es";

async function signIn(credential: {
  password: string;
  phone: string;
}): Promise<void> {
  const { data } = await api(process.env.NEXT_PUBLIC_API_BASEURL).post<{
    code: number;
    data: { access_token: string; id: number };
    desc: string;
  }>("/oss/auth/sign-in", credential);
  const session = await Session.create();

  const { access_token, id } = data.data;

  session[SK_SUB] = `${id}`;

  await cache.setItem(`/${id}/${CK_TOKEN}`, access_token, {
    ttl: 28800000, // 8h in millisecond
  });
  await session.save();

  // TODO
  console.log("credential", credential, data);
}

async function isAuthenticated() {
  const session = await Session.create();
  const sub = session[SK_SUB];
  if (isNil(sub) || (isString(sub) && isEmpty(sub))) {
    return false;
  }

  const hasAccessToken = await cache.hasItem(`/${sub}/${CK_TOKEN}`);
  if (!hasAccessToken) {
    return false;
  }

  return true;
}

async function fetchAccessToken() {
  const session = await Session.create();
  const sub = session[SK_SUB];
  if (isNil(sub) || (isString(sub) && isEmpty(sub))) {
    return false;
  }

  const accessToken = await cache.getItem<string>(`/${sub}/${CK_TOKEN}`);
  if (!accessToken) {
    return false;
  }

  return accessToken;
}

export { fetchAccessToken, isAuthenticated, signIn };
