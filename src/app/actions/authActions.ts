"use server"; // Executed in the server-side: Data Mutation
import { prisma } from "@/libs/prisma";
import { registerSchema } from "@/libs/schemas/RegisterSchema";
import { RegisterFormType } from "@/libs/types/FormType";
import bcrypt from "bcryptjs";

export async function registerUser(data: RegisterFormType) {
  // allows you to parse data safely without throwing an error
  // to validate the data against the schema. Server-side validation
  const validated = registerSchema.safeParse(data);

  if (!validated.success) {
    return { error: validated.error.errors };
  }

  const { name, email, password } = validated.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  // Check if there existing user in our database with that same email
  const existingUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existingUser) return { error: "User already exist" };

  return prisma.user.create({
    data: {
      name,
      email,
      passwordHash: hashedPassword,
    },
  });
}
