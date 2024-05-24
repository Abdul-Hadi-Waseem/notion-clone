"use server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { z } from "zod"
import { FormSchema } from "../types"
import { cookies } from "next/headers"
import { SignUpFormSchema } from "@/app/(auth)/signup/page"

export async function actionLoginUser({
  email,
  password,
}: z.infer<typeof FormSchema>) {
  const supabase = createRouteHandlerClient({ cookies })
  const response = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data: response.data.user, error: response.error?.message }
}
export async function actionSignUpUser({
  email,
  password,
}: z.infer<typeof FormSchema>) {
  const supabase = createRouteHandlerClient({ cookies })
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", email)

  if (data?.length) return { error: { message: "User already exists" }, data }
  const response = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}api/auth/callback`,
    },
  })
  return response
}
