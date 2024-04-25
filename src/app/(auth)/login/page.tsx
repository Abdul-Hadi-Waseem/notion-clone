"use client"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormSchema } from "@/lib/types"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import Link from "next/link"
import Image from "next/image"
import Logo from "../../../../public/cypresslogo.svg"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Loader from "@/components/Loader"
import { actionLoginUser } from "@/lib/server-actions/auth-actions"
interface ILoginPage {}

const LoginPage: React.FC<ILoginPage> = () => {
  const router = useRouter()
  const [submitError, setSubmitError] = useState("")
  const form = useForm<z.infer<typeof FormSchema>>({
    mode: "onChange",
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const isLoading = form.formState.isSubmitting
  const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = async (
    formData
  ) => {
    const { error } = await actionLoginUser(formData)
    if (error) {
      form.reset()
      setSubmitError(error.message)
    }
    router.replace("/dashboard")
  }
  return (
    <Form {...form}>
      <form
        onChange={() => {
          if (submitError) setSubmitError("")
        }}
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full justify-center sm:w-[400px] space-y-6 flex flex-col"
      >
        <Link href={"/"} className="w-full flex justify-left items-center">
          <Image src={Logo} alt={"Notion Clone"} width={50} height={50} />
          <span className="font-semibold dark:text-white text-4xl first-letter:ml-2">
            Cypress
          </span>
        </Link>
        <FormDescription
          className="
        text-foreground/60"
        >
          An all-In-One Collaboration and Productivity Platform
        </FormDescription>
        <FormField
          disabled={isLoading}
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="email" placeholder="Email" {...field}></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={isLoading}
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Password"
                  {...field}
                ></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {submitError && <FormMessage>{submitError}</FormMessage>}
        <Button
          className="w-full p-6 "
          size={"lg"}
          type={"submit"}
          disabled={isLoading}
        >
          {!isLoading ? "Login" : <Loader />}
        </Button>
        <span className="self-center">
          Dont Have An Account?{" "}
          <Link href={"/signup"} className="text-primary">
            Signup
          </Link>
        </span>
      </form>
    </Form>
  )
}

export default LoginPage
