'use client'
import { SignUp } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'


export default function Page() {
    const router = useRouter()
    useEffect(() => {
        router.push("/dashboard")
    }, [router])
    return (<div className='flex justify-center items-center' >
        <SignUp />
    </div>)
}