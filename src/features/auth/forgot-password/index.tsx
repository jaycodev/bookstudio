import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import Logo from '@/assets/icons/logo.svg?react'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const forgotPasswordSchema = z.object({
  email: z.string().trim().email({ message: 'Introduce un correo electrónico válido.' }),
})

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>

const ForgotPasswordPage = ({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) => {
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = (data: ForgotPasswordFormValues) => {
    console.log('Datos para restablecer contraseña:', data)
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <div className="flex flex-col items-center gap-2 font-medium">
                <span className="size-10">
                  <Logo />
                </span>
                <span className="sr-only">BookStudio</span>
              </div>
              <h1 className="text-xl font-bold">Restablece la contraseña</h1>
              <div className="text-center text-sm">
                Escribe la dirección de correo electrónico vinculada a tu cuenta de BookStudio y te
                enviaremos un mensaje.
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="ejemplo@correo.com"
                        autoComplete="email"
                        {...field}
                      />
                    </FormControl>
                    {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
                  </FormItem>
                )}
              />
              <Button type="submit">Enviar enlace</Button>
              <Button variant="outline" asChild>
                <Link to="/login">Volver al inicio de sesión</Link>
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default ForgotPasswordPage
