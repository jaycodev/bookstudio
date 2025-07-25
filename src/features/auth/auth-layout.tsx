import { Outlet } from '@tanstack/react-router'

interface Props {
  children?: React.ReactNode
}

export default function AuthLayout({ children }: Props) {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">{children ? children : <Outlet />}</div>
    </div>
  )
}
