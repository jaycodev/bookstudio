import { SearchIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useSearch } from '@/context/search-context'
import { cn } from '@/lib/utils'

interface Props {
  className?: string
  type?: React.HTMLInputTypeAttribute
  placeholder?: string
}

export function Search({ className = '', placeholder = 'Buscar' }: Props) {
  const { setOpen } = useSearch()
  return (
    <Button
      variant="outline"
      className={cn(
        'bg-muted/25 text-muted-foreground hover:bg-muted/50 relative h-8 w-64 flex-1 justify-start rounded-md text-sm font-normal shadow-none sm:pr-12 sm:flex-none',
        className
      )}
      onClick={() => setOpen(true)}
    >
      <SearchIcon aria-hidden="true" className="absolute top-1/2 left-2 -translate-y-1/2" />
      <span className="ml-5">{placeholder}</span>
      <kbd className="bg-muted pointer-events-none absolute top-[0.3rem] right-[0.3rem] hidden h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none sm:flex">
        <span className="text-xs">⌘</span>K
      </kbd>
    </Button>
  )
}
