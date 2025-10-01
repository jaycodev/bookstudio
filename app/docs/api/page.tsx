import { ApiReferenceReact } from '@scalar/api-reference-react'

export const metadata = {
  title: 'API Reference',
}

import '@scalar/api-reference-react/style.css'
export default function References() {
  return (
    <ApiReferenceReact
      configuration={{
        theme: 'default',
        layout: 'modern',
        expandAllResponses: true,
        hideClientButton: true,
        url: '/openapi.json',
        slug: 'bookstudio-api',
        title: 'BookStudio API',
      }}
    />
  )
}
