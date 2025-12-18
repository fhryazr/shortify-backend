import z from "zod";

export const authSchema = z.object({
  fullname: z.string().min(2).max(100),
  email: z.email(),
  password: z.string().min(6).max(100),
})

export type AuthDTO = z.infer<typeof authSchema>;