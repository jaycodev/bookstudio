'use client'

import { useEffect, useRef } from 'react'

import { usePathname } from 'next/navigation'
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar'

export function NavigationProgress() {
  const ref = useRef<LoadingBarRef>(null)
  const pathname = usePathname()

  useEffect(() => {
    ref.current?.continuousStart()

    const timeout = setTimeout(() => ref.current?.complete(), 300)

    return () => clearTimeout(timeout)
  }, [pathname])

  return <LoadingBar color="var(--ring)" ref={ref} height={2} shadow={true} />
}
