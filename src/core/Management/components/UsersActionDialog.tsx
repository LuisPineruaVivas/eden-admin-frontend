import React, { useEffect } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useAuth } from '@hooks/useAuth'
import useUser from '@hooks/useUser'
import { Button } from '@components/ui/Button'
import { PhoneInput } from '@components/ui/PhoneInput'
import axios, { type AxiosError } from 'axios'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@components/ui/Dialog'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  useFormField,
} from '@components/ui/Form'
import { Input } from '@components/ui/Input'
import { PasswordInput } from '@components/PasswordInput'
import { SelectDropdown } from '@components/SelectDropdown'
import { toast } from 'sonner'
import { POST } from '@config/fetcher/Post'
import { PUT } from '@config/fetcher/Put'
import { cn } from '@lib/utils'
import type { User } from '../data/schema'
import { userTypes } from '../data/data'

function TFormMessage({ className, children, ...props }: React.ComponentProps<'p'>) {
  const { error, formMessageId } = useFormField()
  const { t } = useTranslation('common')

  let body: React.ReactNode | null =
    children ?? (error ? String(error?.message ?? '') : null)

  if (!body) return null

  let content: React.ReactNode = body
  if (typeof body === 'string') {
    const translated = t(body)
    content = translated !== body ? translated : body
  }

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn('text-destructive text-sm', className)}
      {...props}
    >
      {content}
    </p>
  )
}

const formSchema = z
  .object({
    firstName: z.string().min(1, { message: 'translation.management.user_form.errors.firstName' }),
    lastName: z.string().min(1, { message: 'translation.management.user_form.errors.lastName' }),
    email: z.string().email({ message: 'translation.management.user_form.errors.emailFormat' }),
    phone: z.string().min(1, { message: 'translation.management.user_form.errors.phone' }),
    nationalId: z
      .string()
      .regex(/^[vVeE]-\d+$/, { message: 'translation.management.user_form.errors.nationalIdFormat' }),
    role: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
    isEdit: z.boolean(),
  })
  .superRefine(({ isEdit, password, confirmPassword }, ctx) => {
    if (!isEdit || password) {
      if (password.length < 8) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'translation.management.user_form.errors.passwordLength',
          path: ['password'],
        })
      }
      if (password !== confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'translation.management.user_form.errors.passwordMatch',
          path: ['confirmPassword'],
        })
      }
    }
    if (password && !confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'translation.management.user_form.errors.passwordMatch',
        path: ['confirmPassword'],
      })
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

function unformatPhone(formatted: string): string {
  const digits = formatted.replace(/[^\d+]/g, '')
  return digits.startsWith('+') ? digits : `+${digits}`
}

function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  if (/^\+58 \(\d{3}\) \d{3}-\d{4}$/.test(phone)) return phone
  if ((digits.length === 12 && digits.startsWith('58')) || (digits.length === 13 && digits.startsWith('58'))) {
    return `+58 (${digits.slice(2, 5)}) ${digits.slice(5, 8)}-${digits.slice(8, 12)}`
  }
  if (digits.length === 11 && digits.startsWith('04')) {
    return `+58 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 11)}`
  }
  return phone
}

export function UsersActionDialog({
  currentRow,
  open,
  onOpenChange,
  pageIndex,
  pageSize,
  roleFilter,
}: Props) {
  const { t } = useTranslation('common')
  const { token } = useAuth()
  const { user } = useUser()
  const queryClient = useQueryClient()
  const isManager = user.role === 'manager'
  const allowedRoles = !currentRow && isManager ? userTypes.filter((r) => [3, 4, 5].includes(r.value)) : userTypes

  const isEdit = Boolean(currentRow)
  const form = useForm<UserForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? (() => {
          const [firstName, ...rest] = currentRow!.name.split(' ')
          return {
            firstName,
            lastName: rest.join(' '),
            email: currentRow!.email,
            phone: unformatPhone(currentRow!.phone),
            nationalId: currentRow!.national_id,
            role: String(currentRow!.role),
            password: '',
            confirmPassword: '',
            isEdit: true,
          }
        })()
      : {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          nationalId: '',
          role: '',
          password: '',
          confirmPassword: '',
          isEdit: false,
        },
  })

  useEffect(() => {
    if (open && currentRow) {
      form.reset({
        firstName: currentRow.name.split(' ')[0],
        lastName: currentRow.name.split(' ').slice(1).join(' '),
        email: currentRow.email,
        phone: unformatPhone(currentRow.phone),
        nationalId: currentRow.national_id,
        role: String(allowedRoles.find((r) => r.value === currentRow.role)?.value ?? ''),
        password: '',
        confirmPassword: '',
        isEdit: true,
      })
    }
    if (!open) {
      form.reset({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        nationalId: '',
        role: '',
        password: '',
        confirmPassword: '',
        isEdit: false,
      })
    }
  }, [open])

  const mutation = useMutation({
    mutationFn: (values: UserForm) => {
      const formattedPhone = formatPhone(values.phone)
      const formattedNationalId = values.nationalId.toUpperCase()
      const userPayload: Record<string, any> = {
        name: `${values.firstName} ${values.lastName}`,
        email: values.email,
        phone: formattedPhone,
        national_id: formattedNationalId,
        ...(values.password && {
          password: values.password,
          password_confirmation: values.confirmPassword,
        }),
        ...(!isEdit && { role_id: parseInt(values.role, 10) }),
      }

      const url = isEdit
        ? `${import.meta.env.VITE_API_URL}/manager/users/${currentRow!.id}`
        : `${import.meta.env.VITE_API_URL}/manager/users`

      return isEdit ? PUT(url, { user: userPayload }, token) : POST(url, { user: userPayload }, token)
    },
    onSuccess: () => {
      toast.success(t(isEdit ? 'translation.management.user_form.success.edit' : 'translation.management.user_form.success.add'))
      queryClient.invalidateQueries(['users', token, pageIndex, pageSize, roleFilter])
      form.reset()
      onOpenChange(false)
    },
    onError: (err: unknown) => {
      const error = err as AxiosError<{ errors?: Record<string, string[]> }>
      if (axios.isAxiosError(error) && error.response?.data.errors) {
        Object.entries(error.response.data.errors).forEach(([field, msgs]) =>
          form.setError(field as keyof UserForm, { message: msgs[0] }),
        )
      } else {
        toast.error(t(isEdit ? 'translation.management.user_form.error.edit' : 'translation.management.user_form.error.add'))
      }
    },
  })

  const onSubmit = (values: UserForm) => {
    mutation.mutate(values)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? t('translation.management.user_form.title.edit') : t('translation.management.user_form.title.add')}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? t('translation.management.user_form.description.edit')
              : t('translation.management.user_form.description.add')}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('translation.management.user_form.fields.firstName')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <TFormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('translation.management.user_form.fields.lastName')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <TFormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('translation.management.user_form.fields.email')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <TFormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('translation.management.user_form.fields.phone')}</FormLabel>
                  <FormControl>
                    <PhoneInput {...field} defaultCountry="VE" />
                  </FormControl>
                  <TFormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nationalId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('translation.management.user_form.fields.nationalId')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <TFormMessage />
                </FormItem>
              )}
            />

            {!isEdit && (
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('translation.management.user_form.fields.role')}</FormLabel>
                    <FormControl>
                      <SelectDropdown
                        value={field.value}
                        onValueChange={field.onChange}
                        items={allowedRoles.map((r) => ({ label: r.label, value: String(r.value) }))}
                      />
                    </FormControl>
                    <TFormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('translation.management.user_form.fields.password')}</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <TFormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('translation.management.user_form.fields.confirmPassword')}</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <TFormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={!form.formState.isValid} className="btn-primary cursor-pointer">{t('translation.common.save')}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default UsersActionDialog