import useAuth from "@hooks/useAuth"

import { z } from "zod"
import { cn } from "@lib/utils"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { POST } from "@config/fetcher/Post"
import { Input } from "@components/ui/Input"
import { Label } from "@components/ui/Label"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { Button } from "@components/ui/Button"
import { LoginResponse } from "@interface/models"
import { useMutation } from "@tanstack/react-query"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent } from "@components/ui/Card"

const loginSchema = z.object({
  email:    z.email({ message: "Correo inválido" }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { t } = useTranslation("common")
  const navigate = useNavigate()
  const { setCredentials } = useAuth()
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema)
  })

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: (data: LoginFormValues) =>
      POST<LoginResponse>(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        { email: data.email, password: data.password }
      ),
    onSuccess: (res) => {
      setErrorMsg(null)
      if (res.data.token) {
        setCredentials(res.data.token, res.data.user)
        navigate("/dashboard")
      }
    },
    onError: (err: any) => {
      const msg =
        err.response?.data?.message ||
        err.message ||
        t("translation.login.subtitle")
      setErrorMsg(msg)
    }
  })

  const onSubmit = (data: LoginFormValues) => {
    setErrorMsg(null)
    mutate(data)
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">
                  {t("translation.login.welcome")}
                </h1>
                <p className="text-muted-foreground">
                  {t("translation.login.login_to_account")}
                </p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">{t("translation.login.email")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="micorreo@eleden.com"
                  {...register("email")}
                  disabled={isPending}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">{t("translation.login.password")}</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    {t("translation.login.forgot_password")}
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  {...register("password")}
                  disabled={isPending}
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <Button type="submit" className="w-full cursor-pointer" disabled={isPending}>
                {isPending
                  ? t("translation.login.loading", "Cargando...")
                  : t("translation.login.continue")}
              </Button>
              {isError && errorMsg && (
                <div className="text-red-500 text-sm text-center mt-2">
                  {errorMsg}
                </div>
              )}
              {isSuccess && !errorMsg && (
                <div className="text-green-600 text-sm text-center mt-2">
                  {t("translation.login.success")}
                </div>
              )}
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/el-eden-icon.jpg"
              alt="Decorativo"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
