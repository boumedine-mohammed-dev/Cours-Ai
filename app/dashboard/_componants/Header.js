import { SidebarTrigger } from '@/components/ui/sidebar'
import { UserButton } from '@clerk/nextjs'
import React from 'react'

function Header({ hideSideBar = false }) {
    return (
        <div className='flex justify-between items-center p-10 shadow-sm' >
            {!hideSideBar && <SidebarTrigger />}
            <UserButton />
        </div >
    )
}

export default Header
