"use server";

import { signIn } from "@/auth.config";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false,
    });

    return "Success";
  } catch (error) {
    if ((error as any).type === "CredentialsSignin") {
      return "CredentialsSignin";
    }

    return "UnknownError";
  }
}

export async function login(email: string, password: string) {
  try {
    await signIn("credentials", { email, password });

    return { ok: true };
  } catch (error) {
    console.error();
    return {
      ok: false,
      message: "No se pudo iniciar sesion",
    };
  }
}
