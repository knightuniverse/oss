"use server";

import { cache } from "@/lib/cache";
import { CK_TOKEN, SK_SUB } from "@/lib/constants";
import { api } from "@/lib/http";
import { Session } from "@/lib/session";
import { add, differenceInMinutes, fromUnixTime, getUnixTime } from "date-fns";
import { isEmpty, isNil, isString } from "lodash-es";

interface ICredential {
  accessToken: string;
  expiresAt: number; // unix timestamp in seconds
}

function gonnaExpire(expiresAt: number) {
  return differenceInMinutes(fromUnixTime(expiresAt), new Date()) <= 10;
}

async function saveCredential(accessToken: string, sub: number) {
  const session = await Session.create();
  session[SK_SUB] = `${sub}`;
  const credential: ICredential = {
    accessToken,
    expiresAt: getUnixTime(
      add(new Date(), {
        hours: 8,
      })
    ),
  };
  await cache.setItem<ICredential>(`/${sub}/${CK_TOKEN}`, credential, {
    ttl: 28800000, // 8h in millisecond
  });
  await session.save();
  return credential;
}

async function refreshCredential(token: string) {
  const { data } = await api(process.env.NEXT_PUBLIC_API_BASEURL, {
    token,
  }).post<{
    code: number;
    data: { accessToken: string; id: number };
    desc: string;
  }>("/oss/auth/refresh");
  const { accessToken, id } = data.data;
  const credential = await saveCredential(accessToken, id);
  return credential;
}

async function signIn(credential: {
  password: string;
  phone: string;
}): Promise<void> {
  const { data } = await api(process.env.NEXT_PUBLIC_API_BASEURL).post<{
    code: number;
    data: { accessToken: string; id: number };
    desc: string;
  }>("/oss/auth/sign-in", credential);

  const { accessToken, id } = data.data;
  await saveCredential(accessToken, id);
}

async function isAuthenticated() {
  const session = await Session.create();
  const sub = session[SK_SUB];
  if (isNil(sub) || (isString(sub) && isEmpty(sub))) {
    return false;
  }

  const hasCredential = await cache.hasItem(`/${sub}/${CK_TOKEN}`);
  if (!hasCredential) {
    return false;
  }

  return true;
}

async function fetchCredential() {
  const session = await Session.create();
  const sub = session[SK_SUB];
  if (isNil(sub) || (isString(sub) && isEmpty(sub))) {
    return null;
  }

  const credential = await cache.getItem<ICredential>(`/${sub}/${CK_TOKEN}`);
  if (!credential) {
    return null;
  }

  if (gonnaExpire(credential.expiresAt)) {
    // oops, you needs to refresh your credential because of your credential is going to be expired
    const next = await refreshCredential(credential.accessToken);
    return next;
  }

  return credential;
}

export { fetchCredential, isAuthenticated, signIn };
