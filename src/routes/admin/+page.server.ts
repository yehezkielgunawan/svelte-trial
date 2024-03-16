// get the links from the DB using prisma

import prisma from "$lib/prisma";
import type { LinkData } from "$lib/types";
import { redirect } from "@sveltejs/kit";
import CryptoJs from "crypto-js";

export const load = async ({ cookies }) => {
  // create the checking for the user's token here
  // if the user's token is not found, redirect to the login page
  // if the user's token is found, proceed to the next line
  // make sure to use the same encryption method as the one used in the login page and the user email is the same as the one in the DB

  const links: LinkData[] = await prisma.$queryRaw`SELECT * FROM link`;
  let userData;
  const token = cookies.get("token");

  if (token) {
    const email = CryptoJs.AES.decrypt(token, "test").toString(
      CryptoJs.enc.Utf8
    );
    // check if the email is the same as the one in the DB
    userData = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  if (!token || !userData) {
    redirect(307, "/login");
  }

  return {
    data: links,
  };
};

export const actions = {
  logout: async ({ cookies, request }) => {
    // clear the user's token from the cookie
    cookies.delete("token", { path: "/" });
  },
};
