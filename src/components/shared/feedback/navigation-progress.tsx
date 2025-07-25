import { useEffect, useRef } from 'react'
import { useRouterState } from '@tanstack/react-router'
import LoadingBar, { LoadingBarRef } from 'react-top-loading-bar'

export default function NavigationProgress() {
  const ref = useRef<LoadingBarRef>(null)
  const state = useRouterState()

  useEffect(() => {
    if (state.status === 'pending') {
      ref.current?.continuousStart()
    } else {
      ref.current?.complete()
    }
  }, [state.status])

  return <LoadingBar color="var(--ring)" ref={ref} height={2} shadow={true} />
}
