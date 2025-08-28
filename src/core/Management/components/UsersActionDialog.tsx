import axios, { type AxiosError } from 'axios'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@components/ui/Button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@components/ui/Dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/Form'
import { Input } from '@components/ui/Input'
import { PasswordInput } from '@components/PasswordInput'
import { SelectDropdown } from '@components/SelectDropdown'
import { userTypes } from '../data/data'
import { User } from '../data/schema'
import { POST } from '@config/fetcher/Post'
import { useSelector } from 'react-redux'
import { RootState } from '@config/store'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from "react-i18next"
import useAuth from '@/hooks/useAuth'
import useUser from '@/hooks/useUser'


const formSchema = z
  .object({
    firstName: z.string().min(1, { message: 'First Name is required.' }),
    lastName: z.string().min(1, { message: 'Last Name is required.' }),
    phoneNumber: z.string().min(1, { message: 'Phone number is required.' }),
    email: z
      .string()
      .min(1, { message: 'Email is required.' })
      .email({ message: 'Email is invalid.' }),
    role: z.string().min(1, { message: 'Role is required.' }),
    password: z.string().transform((pwd) => pwd.trim()),
    confirmPassword: z.string().transform((pwd) => pwd.trim()),
    isEdit: z.boolean(),
  })
  .superRefine(({ isEdit, password, confirmPassword }, ctx) => {
    if (!isEdit || (isEdit && password !== '')) {
      if (!password) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Password is required.', path: ['password'] })
      }
      if (password.length < 8) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Password must be at least 8 characters long.', path: ['password'] })
      }
      if (!/[a-z]/.test(password)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Password must contain at least one lowercase letter.', path: ['password'] })
      }
      if (!/\d/.test(password)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Password must contain at least one number.', path: ['password'] })
      }
      if (password !== confirmPassword) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Passwords don't match.", path: ['confirmPassword'] })
      }
    }
  })

type UserForm = z.infer<typeof formSchema>

interface Props {
  currentRow?: User
  open: boolean
  onOpenChange: (open: boolean) => void
  pageIndex: number
  pageSize: number
  roleFilter?: string
}

export function UsersActionDialog({ currentRow, open, onOpenChange, pageIndex, pageSize, roleFilter }: Props) {
  const { user } = useUser();
  const { token } = useAuth();
  const { t } = useTranslation("common")

  const queryClient = useQueryClient()
  const isManagerRole = user?.role === 'manager'
  const allowedRoles = !currentRow && isManagerRole
    ? userTypes.filter((r) => ['analyst', 'supervisor', 'seller'].includes(r.value))
    : userTypes

  const isEdit = Boolean(currentRow)
  const form = useForm<UserForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
          firstName: currentRow!.name.split(' ')[0],
          lastName: currentRow!.name.split(' ').slice(1).join(' '),
          phone: currentRow!.phone,
          email: currentRow!.email,
          role: String(currentRow!.role),
          password: '',
          confirmPassword: '',
          isEdit: true,
        }
      : {
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
          role: '',
          password: '',
          confirmPassword: '',
          isEdit: false,
        },
  })

  const isPasswordTouched = !!form.formState.dirtyFields.password

  const onSubmit = async (values: UserForm) => {
    const roleId = parseInt(values.role, 10)
    const payload = {
      user: {
        name: values.firstName + ' ' + values.lastName,
        email: values.email,
        phone: values.phoneNumber,
        password: values.password,
        password_confirmation: values.confirmPassword,
        role_id: roleId,
      },
    }
    try {
    await POST(
      `${import.meta.env.VITE_API_URL}/manager/users`,
      payload,
      token
    )
    toast.success(isEdit ? 'User updated' : 'User created')
    queryClient.invalidateQueries(['users', token, pageIndex, pageSize, roleFilter])
    form.reset()
    onOpenChange(false)
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ errors?: Record<string, string[]>; message?: string }>
      const status = axiosError.response?.status
      const data = axiosError.response?.data

      if (status === 403) {
        toast.error('No tienes permisos suficientes para esta acción.')
      } else if (data?.errors) {
        Object.entries(data.errors).forEach(([field, messages]) =>
          form.setError(field as keyof UserForm, { message: messages[0] })
        )
      } else if (data?.message) {
        toast.error(data.message)
      } else {
        toast.error('Error al guardar el usuario.')
      }
    } else {
      console.error('Unexpected error', error)
      toast.error('Error al guardar el usuario.')
    }
  }
}

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="text-left">
          <DialogTitle>{isEdit ? t("translation.management.user_edit_modal.title") : t("translation.management.user_create_modal.title")}</DialogTitle>
          <DialogDescription>
            {isEdit ? t("translation.management.user_edit_modal.description") : t("translation.management.user_create_modal.description")}{' '}
            {t("translation.management.user_edit_modal.saveMsg")}
          </DialogDescription>          
        </DialogHeader>
        <div className="-mr-4 h-[26.25rem] w-full overflow-y-auto py-1 pr-4">
          <Form {...form}>
            <form id="user-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-0.5">
              {/* First Name */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1">
                    <FormLabel className="col-span-2 text-right">{t("translation.management.user_create_modal.firstname")}</FormLabel>
                    <FormControl>
                      <Input placeholder="John" className="col-span-4" autoComplete="off" {...field} />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
              {/* Last Name */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1">
                    <FormLabel className="col-span-2 text-right">{t("translation.management.user_create_modal.lastname")}</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" className="col-span-4" autoComplete="off" {...field} />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1">
                    <FormLabel className="col-span-2 text-right">{t("translation.management.user_create_modal.email")}</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe@gmail.com" className="col-span-4" {...field} />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
              {/* Phone Number */}
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1">
                    <FormLabel className="col-span-2 text-right">{t("translation.management.user_create_modal.phone")}</FormLabel>
                    <FormControl>
                      <Input placeholder="+123456789" className="col-span-4" {...field} />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
              {/* Role */}
              <FormField
    control={form.control}
    name="role"
    render={({ field }) => (
      <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1">
        <FormLabel className="col-span-2 text-right">{t("translation.management.user_create_modal.role")}</FormLabel>
        <SelectDropdown
          defaultValue={field.value}
          onValueChange={(v) => field.onChange(v)}
          placeholder="Select a role"
          className="col-span-4"
          items={allowedRoles.map(({ label, value }) => ({
            label,
            value: String(value),
          }))}
        />
        <FormMessage className="col-span-4 col-start-3" />
      </FormItem>
    )}
  />
              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1">
                    <FormLabel className="col-span-2 text-right">{t("translation.management.user_create_modal.password")}</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder="••••••••" className="col-span-4" {...field} />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
              {/* Confirm Password */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1">
                    <FormLabel className="col-span-2 text-right">{t("translation.management.user_create_modal.confirmPassword")}</FormLabel>
                    <FormControl>
                      <PasswordInput
                        disabled={!isPasswordTouched}
                        placeholder="••••••••"
                        className="col-span-4"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button type="submit" form="user-form">
            {t("translation.management.user_create_modal.submit")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}