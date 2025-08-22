'use client'
import React from 'react'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Book, Compass, UserCircle2Icon, WalletCards, LayoutDashboard } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import CourseFormDialog from './CourseFormDialog'
function Appsidebar() {
    const path = usePathname();
    const menu = [
        { title: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
        { title: "My Courese", icon: Book, path: "/dashboard/my-course" },
        { title: "Explore", icon: Compass, path: "/" },
        { title: "Profile", icon: UserCircle2Icon, path: "/dashboard/profile" },
    ]
    return (
        <div>
            <Sidebar>
                <SidebarHeader className='flex items-center' >
                    <Image src='/logo.png' width={100} height={100} alt='logo' />
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup className='flex items-center' ><CourseFormDialog /></SidebarGroup>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {menu.map((e, index) => {
                                    return (
                                        <Link key={index} href={e.path} className={` rounded-2xl ${path == e.path && 'bg-[#5486CD]'}`} >
                                            <SidebarMenuItem>
                                                <SidebarMenuButton>
                                                    <e.icon className='text-[#5486CD]' />
                                                    <span>{e.title}</span>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        </Link>)
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>

                </SidebarContent>
                <SidebarFooter />
            </Sidebar>
        </div>
    )
}

export default Appsidebar
