import axios, { type AxiosError } from 'axios'
import React from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@components/ui/Button'
import { PhoneInput } from '@components/ui/PhoneInput'
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


const formSchema = z.object({
  firstName: z.string().min(1, { message: 'First Name is required.' }),
  lastName: z.string().min(1, { message: 'Last Name is required.' }),
  phone: z.string().min(1, { message: 'Phone is required.' }),
  nationalId: z.string().min(1, { message: 'National ID is required.' })
  .regex(/^[vVeE]-\d+$/, { message: 'Formato de cédula inválido. Ej: V-12345678' }),
  email: z.string().min(1, { message: 'Email is required.' }).email({ message: 'Email is invalid.' }),
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

function unformatPhone(formatted: string): string {
  const digits = formatted.replace(/[^\d+]/g, '')
  return digits.startsWith('+') ? digits : `+${digits}`
}

function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (/^\+58 \(\d{3}\) \d{3}-\d{4}$/.test(phone)) return phone;
  if ((digits.length === 12 && digits.startsWith("58")) || (digits.length === 13 && digits.startsWith("58"))) {
    return `+58 (${digits.slice(2, 5)}) ${digits.slice(5, 8)}-${digits.slice(8, 12)}`;
  }
  if (digits.length === 11 && digits.startsWith("04")) {
    return `+58 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7, 11)}`;
  }
  return phone;
}

export function UsersActionDialog({ currentRow, open, onOpenChange, pageIndex, pageSize, roleFilter }: Props) {
  const token = useSelector((state: RootState) => state.user.token)
  const queryClient = useQueryClient()
  const userRole = useSelector((state: RootState) => state.user.user.role)
  const isManagerRole = userRole === 'manager'
  const allowedRoles = !currentRow && isManagerRole
    ? userTypes.filter((r) => [3, 4, 5].includes(r.value))
    : userTypes

  const isEdit = Boolean(currentRow)
  const form = useForm<UserForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
    ? (() => {
        const [firstName, ...rest] = currentRow!.name.split(' ')
        return {
          firstName:    firstName ?? '',
          lastName:     rest.join(' ') ?? '',
          email:        currentRow!.email       ?? '',
          phone:        unformatPhone(currentRow!.phone),
          nationalId:   currentRow!.national_id ?? '',
          role: String(
            allowedRoles.find(
              r => r.label.toLowerCase() === currentRow!.role.toLowerCase()
            )?.value ?? ''
          ),
          password:        '',
          confirmPassword: '',
          isEdit:          true,
        }
      })()
    : {
        firstName:       '',
        lastName:        '',
        email:           '',
        phone:           '',
        nationalId:      '',
        role:            '',
        password:        '',
        confirmPassword: '',
        isEdit:          false,
      },
})

  const isPasswordTouched = !!form.formState.dirtyFields.password

  const onSubmit = async (values: UserForm) => {
  const roleId = parseInt(values.role, 10)
  const formattedPhone = formatPhone(values.phone)
  const formattedNationalId = values.nationalId.toUpperCase()
  const payload = {
    user: {
      name: `${values.firstName} ${values.lastName}`,
      email: values.email,
      phone: formattedPhone,
      national_id: formattedNationalId,
      password: values.password,
      password_confirmation: values.confirmPassword,
      ...(isEdit ? {} : { role_id: roleId }),
    },
  }

  try {
    if (isEdit && currentRow) {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/manager/users/${currentRow.id}`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      )
    } else {
      await POST(
        `${import.meta.env.VITE_API_URL}/manager/users`,
        payload,
        token
      )
    }

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
    if (state && currentRow) {
      form.reset({
        firstName:      currentRow.firstName   ?? '',
        lastName:       currentRow.lastName    ?? '',
        email:          currentRow.email       ?? '',
        phone:          unformatPhone(currentRow.phone),
        nationalId:     currentRow.nationalId  ?? '',
        role:           String(currentRow.role ?? ''),
        password:       '',
        confirmPassword:'',
        isEdit:         true,
      })
    } else {
      form.reset({
        firstName:      '',
        lastName:       '',
        email:          '',
        phone:          '',
        nationalId:     '',
        role:           '',
        password:       '',
        confirmPassword:'',
        isEdit:         false,
      })
    }
    onOpenChange(state)
  }}
>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="text-left">
          <DialogTitle>{isEdit ? 'Edit User' : 'Add New User'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Update the user here.' : 'Create new user here.'}{' '}
            Click save when you&apos;re done.
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
                    <FormLabel className="col-span-2 text-right">First Name</FormLabel>
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
                    <FormLabel className="col-span-2 text-right">Last Name</FormLabel>
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
                    <FormLabel className="col-span-2 text-right">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe@gmail.com" className="col-span-4" {...field} />
                    </FormControl>
                    <FormMessage className="col-span-4 col-start-3" />
                  </FormItem>
                )}
              />
              {/*Phone and nationalid */}
  <FormField
  control={form.control}
  name="phone"
  render={({ field }) => (
    <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1">
      <FormLabel className="col-span-2 text-right">Phone Number</FormLabel>
      <FormControl>
        <PhoneInput
          className="col-span-4"
          value={field.value}
          onChange={field.onChange}
          defaultCountry="VE"
          placeholder="Ej: 412 1234567"
        />
      </FormControl>
      <FormMessage className="col-span-4 col-start-3" />
    </FormItem>
  )}
/>
<FormField
  control={form.control}
  name="nationalId"
  render={({ field }) => (
    <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1">
      <FormLabel className="col-span-2 text-right">National ID</FormLabel>
      <FormControl>
        <Input placeholder="V-12345670" className="col-span-4" {...field} />
      </FormControl>
      <FormMessage className="col-span-4 col-start-3" />
    </FormItem>
  )}
/>
              {/* Role */}
              {!isEdit && (
  <FormField
    control={form.control}
    name="role"
    render={({ field }) => (
      <FormItem className="grid grid-cols-6 gap-x-4">
        <FormLabel className="col-span-2 text-right">Role</FormLabel>
        <SelectDropdown
          value={field.value}
          onValueChange={field.onChange}
          placeholder="Select a role"
          items={allowedRoles.map(r => ({ label: r.label, value: String(r.value) }))}
          className="col-span-4"
        />
        <FormMessage className="col-span-4 col-start-3" />
      </FormItem>
    )}
  />
  )}
              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-6 items-center gap-x-4 gap-y-1">
                    <FormLabel className="col-span-2 text-right">Password</FormLabel>
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
                    <FormLabel className="col-span-2 text-right">Confirm Password</FormLabel>
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
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}