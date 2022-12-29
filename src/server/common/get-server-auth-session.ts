import { getIronSession } from "iron-session";
import { type GetServerSidePropsContext } from "next";
import { ironOptions } from "./iron-session-options";

/**
 * Wrapper for unstable_getServerSession https://next-auth.js.org/configuration/nextjs
 * See example usage in trpc createContext or the restricted API route
 */
export const getServerAuthSession = async (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
  ttl?: number;
}) => {
  return await getIronSession(ctx.req, ctx.res, {
    ...ironOptions,
    // ttl: 120,
    ttl: ctx.ttl === 0 || ctx.ttl ? ctx.ttl : 3600,
  });
};
