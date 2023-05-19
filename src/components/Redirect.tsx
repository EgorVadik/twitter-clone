'use client'
import { useRouter } from 'next/navigation'

type props = {
    redirectTo: string
}

function Redirect({ redirectTo }: props) {
    const router = useRouter()
    router.push(redirectTo)
    return null
}

export default Redirect
