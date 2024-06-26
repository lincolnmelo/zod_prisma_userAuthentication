import { Role } from "@prisma/client"
import { z } from "zod"

const phoneRegex = new RegExp(/^([14689][0-9]|2[12478]|3([1-5]|[7-8])|5([13-5])|7[193-7])9[0-9]{8}$/)

export const createUserSchema = z.object({
  fname: z.string().min(1, { message: "Must contain at least 1 character" }),
  lname: z.string().min(1, { message: "Must contain at least 1 character" }),
  phone: z.string().regex(phoneRegex, "Must be a valid phone number"),
  email: z.string().email({ message: "Must be a valid email address" }),
  password: z.string().min(6, { message: "Must be at least 6 characters long" }),
  roles: z.array(z.enum([Role.ADMIN, Role.MANAGER, Role.USER])).optional(),
  refreshToken: z.string().optional(),
})

type _CreateUserInput = z.infer<typeof createUserSchema>

export type CreateUserInput = {
  [ key in keyof _CreateUserInput ]-?: Exclude<_CreateUserInput[ key ], null>
}

export const updateUserSchema = createUserSchema.partial()

export type UpdateUserInput = z.infer<typeof updateUserSchema>

// export const registerUserSchema = createUserSchema.omit({
//   roles: true,
//   refreshToken: true,
// })

export const registerUserSchema = createUserSchema.omit({})

export type _RegisterUserInput = z.infer<typeof registerUserSchema>

export type RegisterUserInput = {
  [ key in keyof _RegisterUserInput ]-?: Exclude<_RegisterUserInput[ key ], null>
}

export const loginUserSchema = registerUserSchema.omit({ fname: true, lname: true }).extend({
  phone: z.string().regex(phoneRegex, "Must be a valid phone number"),
  email: z.string().email({ message: "Must be a valid email address" }),
})

export type LoginUserInput = z.infer<typeof loginUserSchema>