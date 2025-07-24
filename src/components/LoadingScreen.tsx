import { LibraryBig } from 'lucide-react'

export default function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <div className="bg-primary text-primary-foreground flex aspect-square h-16 w-16 items-center justify-center rounded-2xl">
        <LibraryBig className="h-10 w-10" />
      </div>
    </div>
  )
}
