'use client'
import { SignIn } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
export default function Page() {
    const router = useRouter()
    useEffect(() => {
        router.push("/dashboard")
    }, [router])
    return (
        <div className='flex justify-center items-center' >
            <SignIn />
        </div>
    )
}