import { useState, useEffect, useRef } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import { Pencil, Trash, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/ui/password-input'

const photoSchema = z.object({
  photo: z
    .instanceof(File)
    .refine(
      (file) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
        return allowedTypes.includes(file.type)
      },
      { message: 'Solo se permiten imágenes en formato JPG, PNG, GIF o WEBP.' }
    )
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: 'El tamaño máximo de la imagen es 5MB.',
    })
    .nullable(),
})

const personalSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: 'El nombre de usuario debe tener al menos 2 caracteres.',
    })
    .max(15, {
      message: 'El nombre de usuario no puede tener más de 15 caracteres.',
    })
    .transform((val) => val.trim())
    .refine((val) => /^[A-Za-z0-9_]+$/.test(val), {
      message: 'El nombre de usuario solo puede contener letras, números y guiones bajos.',
    }),
  email: z.string().trim().email({ message: 'Introduce un correo electrónico válido.' }),
  firstName: z
    .string()
    .min(2, { message: 'El nombre debe tener al menos 2 caracteres.' })
    .max(50, { message: 'El nombre no puede tener más de 50 caracteres.' })
    .transform((val) => val.trim().replace(/\s+/g, ' '))
    .refine((val) => /^[A-Za-zÀ-ÿ\s-]+$/.test(val), {
      message: 'El nombre solo puede contener letras, espacios y guiones (-).',
    }),
  lastName: z
    .string()
    .min(2, { message: 'El apellido debe tener al menos 2 caracteres.' })
    .max(50, { message: 'El apellido no puede tener más de 50 caracteres.' })
    .transform((val) => val.trim().replace(/\s+/g, ' '))
    .refine((val) => /^[A-Za-zÀ-ÿ\s-]+$/.test(val), {
      message: 'El apellido solo puede contener letras, espacios y guiones (-).',
    }),
})

const passwordSchema = z
  .object({
    currentPassword: z.string().trim().min(8, {
      message: 'La contraseña actual debe tener al menos 8 caracteres.',
    }),
    newPassword: z
      .string()
      .trim()
      .min(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
      .max(50, {
        message: 'La contraseña no puede tener más de 50 caracteres.',
      })
      .regex(/^\S+$/, 'La contraseña no puede contener espacios en blanco.')
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/, {
        message:
          'La contraseña debe incluir al menos una minúscula, una mayúscula, un número y un carácter especial (@$!%*?&).',
      }),
    confirmNewPassword: z
      .string()
      .trim()
      .min(8, { message: 'Debes confirmar la contraseña nueva.' }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: 'Las contraseñas no coinciden.',
    path: ['confirmNewPassword'],
  })

type PhotoFormValues = z.infer<typeof photoSchema>
type PersonalFormValues = z.infer<typeof personalSchema>
type PasswordFormValues = z.infer<typeof passwordSchema>

const personalDefaults: Partial<PersonalFormValues> = {
  username: 'Jason',
  email: 'jasonvilac@gmail.com',
  firstName: 'Jason',
  lastName: 'Vila',
}

const passwordDefaults: Partial<PasswordFormValues> = {
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: '',
}

const Profile = () => {
  const photoForm = useForm<PhotoFormValues>({
    resolver: zodResolver(photoSchema),
    defaultValues: { photo: null },
    mode: 'onChange',
  })

  const personalForm = useForm<PersonalFormValues>({
    resolver: zodResolver(personalSchema),
    defaultValues: personalDefaults,
    mode: 'onChange',
  })

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: passwordDefaults,
    mode: 'onChange',
  })

  const photoValue = useWatch({ control: photoForm.control, name: 'photo' })
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [photoError, setPhotoError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUploadPhoto = () => {
    fileInputRef.current?.click()
  }

  const handleDeletePhoto = () => {
    photoForm.setValue('photo', null)
    setAvatarUrl(null)
    setPhotoError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handlePhotoSubmit = (data: PhotoFormValues) => {
    console.log('Datos de la foto de perfil:', data)
  }

  const handlePersonalSubmit = (data: PersonalFormValues) => {
    console.log('Datos personales:', data)
  }

  const handlePasswordSubmit = (data: PasswordFormValues) => {
    console.log('Datos para cambiar contraseña:', data)
  }

  useEffect(() => {
    if (photoValue instanceof File) {
      try {
        photoSchema.shape.photo.parse(photoValue)
        const objectUrl = URL.createObjectURL(photoValue)
        setAvatarUrl(objectUrl)
        setPhotoError(null)

        photoForm.handleSubmit(handlePhotoSubmit)()
        return () => URL.revokeObjectURL(objectUrl)
      } catch (error) {
        if (error instanceof z.ZodError) {
          setPhotoError(error.errors[0].message)
          setAvatarUrl(null)
        }
      }
    } else {
      setAvatarUrl(null)
      setPhotoError(null)
    }
  }, [photoValue, photoForm])

  const getFallback = () => {
    const { firstName, lastName } = personalForm.getValues()
    return `${firstName[0] || ''}${lastName[0] || ''}`.toUpperCase()
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Configuración de perfil</h3>
        <p className="text-sm text-muted-foreground">
          Actualiza tu información personal, foto de perfil y contraseña.
        </p>
      </div>

      <div className="flex flex-col items-center relative">
        <div className="relative">
          <Avatar key={avatarUrl ?? 'fallback'} className="w-32 h-32">
            {avatarUrl ? (
              <AvatarImage src={avatarUrl} alt="Foto de perfil" className="object-cover" />
            ) : (
              <AvatarFallback className="text-5xl">{getFallback()}</AvatarFallback>
            )}
          </Avatar>
          <div className="absolute bottom-0 right-0">
            <DropdownMenu>
              <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center bg-background">
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full h-full p-0 rounded-full"
                    aria-label="Editar"
                    title="Editar"
                  >
                    <Pencil />
                  </Button>
                </DropdownMenuTrigger>
              </div>

              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleUploadPhoto}>
                  <Upload className="text-current" />
                  Subir foto
                </DropdownMenuItem>
                {avatarUrl && (
                  <DropdownMenuItem
                    className="text-destructive data-[highlighted]:text-destructive"
                    onClick={handleDeletePhoto}
                  >
                    <Trash className="text-current" />
                    Eliminar foto
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <input
          ref={fileInputRef}
          id="photo-input"
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) {
              photoForm.setValue('photo', file)
            }
          }}
        />

        {photoError && <p className="text-xs text-destructive mt-2 text-center">{photoError}</p>}
      </div>

      <Separator />

      <Form {...personalForm}>
        <form onSubmit={personalForm.handleSubmit(handlePersonalSubmit)} className="space-y-8">
          <div className="space-y-6">
            <h4 className="text-md font-semibold">Información personal</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <FormField
                control={personalForm.control}
                name="firstName"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingrese su nombre" autoComplete="given-name" {...field} />
                    </FormControl>
                    {fieldState.error && <FormMessage />}
                  </FormItem>
                )}
              />
              <FormField
                control={personalForm.control}
                name="lastName"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Apellido</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ingrese su apellido"
                        autoComplete="family-name"
                        {...field}
                      />
                    </FormControl>
                    {fieldState.error && <FormMessage />}
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={personalForm.control}
              name="username"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Nombre de usuario</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ingrese su nombre de usuario"
                      autoComplete="username"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Puedes cambiar tu nombre de usuario una vez cada 30 días.
                  </FormDescription>
                  {fieldState.error && <FormMessage />}
                </FormItem>
              )}
            />
            <FormField
              control={personalForm.control}
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
                  {fieldState.error && <FormMessage />}
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-center">
            <Button type="submit">Actualizar perfil</Button>
          </div>
        </form>
      </Form>

      <Separator />

      <Form {...passwordForm}>
        <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)} className="space-y-8">
          <div className="space-y-6">
            <h4 className="text-md font-semibold">Cambiar contraseña</h4>
            <FormField
              control={passwordForm.control}
              name="currentPassword"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Contraseña actual</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder="Contraseña actual"
                      autoComplete="current-password"
                      {...field}
                    />
                  </FormControl>
                  {fieldState.error && <FormMessage />}
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <FormField
                control={passwordForm.control}
                name="newPassword"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Contraseña nueva</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="Contraseña nueva"
                        autoComplete="new-password"
                        {...field}
                      />
                    </FormControl>
                    {fieldState.error && <FormMessage />}
                  </FormItem>
                )}
              />
              <FormField
                control={passwordForm.control}
                name="confirmNewPassword"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Confirmar contraseña nueva</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder="Confirmar contraseña nueva"
                        autoComplete="new-password"
                        {...field}
                      />
                    </FormControl>
                    {fieldState.error && <FormMessage />}
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <Button type="submit">Cambiar contraseña</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default Profile
