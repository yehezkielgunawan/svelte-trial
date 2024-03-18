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
  logout: async ({ cookies }) => {
    // clear the user's token from the cookie
    cookies.delete("token", { path: "/" });
  },
  add: async ({ request }) => {
    const data = await request.formData();
    const pageName = data.get("pageName");
    const url = data.get("url");
    const linkID = data.get("id");

    // check if the id is found in the DB
    if (linkID) {
      await prisma.link.update({
        where: {
          id: parseInt(linkID as string),
        },
        data: {
          name: pageName as string,
          url: url as string,
        },
      });
      return {
        status: 201,
        body: { message: "Link updated!" },
      };
    } else {
      // insert the new link to the DB
      await prisma.link.create({
        data: {
          name: pageName as string,
          url: url as string,
        },
      });
      // return the status code
      return {
        status: 201,
        body: { message: "Link added!" },
      };
    }
  },
  delete: async ({ request }) => {
    const data = await request.formData();
    const linkID = data.get("id");

    // delete the link from the DB
    await prisma.link.delete({
      where: {
        id: parseInt(linkID as string),
      },
    });
    return {
      status: 200,
      body: { message: "Link Deleted!" },
    };
  },
};
