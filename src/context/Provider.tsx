'use client'

import { SessionProvider } from 'next-auth/react'

function Provider({ children }: any) {
    return (
        <SessionProvider>
            <div>{children}</div>
        </SessionProvider>
    )
}

export default Provider
