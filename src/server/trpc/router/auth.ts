import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const authRouter = router({
  login: publicProcedure
    .input(
      z.object({
        email: z.string().email({ message: "Hey, try with an email instead" }),
        password: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findFirst({
        where: {
          email: input.email,
        },
      });

      if (!user) {
        throw new TRPCError({ code: "BAD_REQUEST", cause: "User not found" });
      }
      if (user.password !== input.password) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          cause: "Hey your password is wrong",
        });
      }

      return {
        user,
      };
    }),
  register: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
        password_confirm: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      /**
       * 1. check if password and confirm password are the same, if not return an error
       * 2. ctx.prisma.user.create({data:{...}})
       * 3. return a sucess response
       */

      return {
        message: "Success",
      };
    }),
});
