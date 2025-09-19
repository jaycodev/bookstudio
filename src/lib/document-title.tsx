import { useEffect } from 'react'

import { useLocation } from '@tanstack/react-router'

import { pageMap } from '@/config/page-map'

export default function DocumentTitle() {
  const location = useLocation()

  useEffect(() => {
    const page = pageMap[location.pathname]
    const title = page?.documentTitle || page?.title || ''
    document.title = title ? `${title} - BookStudio` : 'BookStudio'
  }, [location.pathname])

  return null
}
