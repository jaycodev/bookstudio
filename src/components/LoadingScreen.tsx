import Logo from '@/assets/icons/logo.svg?react'

export default function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <span className="size-20">
        <Logo />
      </span>
    </div>
  )
}
