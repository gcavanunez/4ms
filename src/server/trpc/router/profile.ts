import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";
export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  updateProfile: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string(),
      })
    )
    .mutation(() => {
      return "you can now see this secret message!";
    }),
  updatePassword: protectedProcedure
    .input(
      z
        .object({
          current_password: z.string(),
          new_password: z.string(),
          password_confirm: z.string(),
        })
        .refine((data) => data.new_password === data.password_confirm, {
          message: "Passwords don't match",
          path: ["password_confirm"],
        })
    )
    .mutation(() => {
      return "you can now see this secret message!";
    }),
});
