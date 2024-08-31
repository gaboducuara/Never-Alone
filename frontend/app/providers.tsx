// app/providers.tsx
'use client'

import { NextUIProvider } from '@nextui-org/react'
import SessionAuthProvider from '../context/SessionAuthProvider'

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <SessionAuthProvider>{children}</SessionAuthProvider>
    </NextUIProvider>
  )
}