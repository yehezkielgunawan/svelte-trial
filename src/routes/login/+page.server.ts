import prisma from "$lib/prisma.js";
import type { UserData } from "$lib/types.js";
import { fail } from "@sveltejs/kit";
import CryptoJs from "crypto-js";

export const actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    const hashedPassword = CryptoJs.MD5(password).toString();

    const userData = await prisma.user.findUnique({
      where: {
        email: email as string,
        password: hashedPassword,
      },
    });

    // if the user is not found
    if (!userData) {
      return fail(401, { error: "Invalid email or password" });
    } else {
      // if the user is found, encode the user id into a JWT token then store it in a cookie
      const token = CryptoJs.AES.encrypt(userData.email, "test").toString();

      cookies.set("token", token, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        maxAge: 3600,
      });

      return {
        status: 200,
        body: { message: "Login successful" },
      };
    }
  },
};
