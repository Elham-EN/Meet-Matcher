"use server"; // Executed in the server-side: Data Mutation
import { prisma } from "@/libs/prisma";
import { registerSchema } from "@/libs/schemas/RegisterSchema";
import { ActionResult } from "@/libs/types";
import { RegisterFormType } from "@/libs/types/FormType";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";

export async function registerUser(data: RegisterFormType): Promise<ActionResult<User>> {
  try {
    // allows you to parse data safely without throwing an error
    // to validate the data against the schema. Server-side validation
    const validated = registerSchema.safeParse(data);

    if (!validated.success) {
      return { status: "error", error: validated.error.errors };
    }

    const { name, email, password } = validated.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if there existing user in our database with that same email
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) return { status: "error", error: "User already exist" };

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword,
      },
    });

    return { status: "success", data: user };
  } catch (error) {
    console.log(error);
    return { status: "error", error: "Someting went wrong" };
  }
}
