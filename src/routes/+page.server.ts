// get the links from the DB using prisma

import prisma from "$lib/prisma";
import type { LinkData } from "$lib/types";

export const load = async () => {
  const links: LinkData[] = await prisma.$queryRaw`SELECT * FROM link`;
  return {
    data: links,
  };
};
