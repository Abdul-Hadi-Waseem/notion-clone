"use server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { z } from "zod"
import { FormSchema } from "../types"
import { cookies } from "next/headers"

export async function actionLoginUser({
  email,
  password,
}: z.infer<typeof FormSchema>) {
  const supabase = createRouteHandlerClient({ cookies })
  const response = supabase.auth.signInWithPassword({
    email,
    password,
  })
  return response
}
