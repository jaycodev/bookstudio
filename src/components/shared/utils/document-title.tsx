import { useEffect } from 'react'
import { useLocation } from '@tanstack/react-router'

import { pageMap } from '@/lib/constants/page-map'

export default function DocumentTitle() {
  const location = useLocation()

  useEffect(() => {
    const title = pageMap[location.pathname]?.title ?? ''
    document.title = title ? `${title} - BookStudio` : 'BookStudio'
  }, [location.pathname])

  return null
}
