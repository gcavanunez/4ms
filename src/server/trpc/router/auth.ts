import { TRPCError } from "@trpc/server";
import { z } from "zod";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { router, publicProcedure } from "../trpc";

export const authRouter = router({
  // getUser: publicProcedure.input()
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

      ctx.session["user"] = { id: user.id };
      await ctx.session.save();

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
  passwordEmail: publicProcedure
    .input(
      z.object({
        email: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      /**
       * 1. check user exists
       * 2. remove any older tokens
       * 3. generate a hash
       * 4. create a hash and persist it to the database (should send email)
       * 5. return a sucess message
       */
      const user = await ctx.prisma.user.findFirst({
        where: {
          email: input.email,
        },
      });

      if (!user) {
        throw new TRPCError({ code: "BAD_REQUEST", cause: "User not found" });
      }

      await ctx.prisma.passwordReset.delete({
        where: {
          email: input.email,
        },
      });

      const char = crypto.randomBytes(20).toString("hex");
      const salt = await bcrypt.genSalt(10, "b");
      const token = await bcrypt.hash(char, salt);

      await ctx.prisma.passwordReset.create({
        data: {
          email: input.email,
          token,
        },
      });

      return {
        message: "Password created",
      };
    }),
});
