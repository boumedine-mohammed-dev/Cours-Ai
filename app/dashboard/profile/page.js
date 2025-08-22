import { UserProfile } from '@clerk/nextjs'
import React from 'react'

function page() {
    return (
        <div className='p-3 mt-6'>
            <h2 className='font-bold text-blue-500 text-[30px] flex justify-center items-center '> Manager Your Profile</h2>
            <div className='flex justify-center items-center mt-6'><UserProfile routing='hash' /></div>

        </div>
    )
}

export default page
