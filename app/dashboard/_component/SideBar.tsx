"use client";
import React from 'react'
import Image from 'next/image'
import Logo from '@/public/logo.png'
import { MdDashboard } from 'react-icons/md'
import { FaCartPlus, FaHistory } from 'react-icons/fa'
import { CiSettings } from 'react-icons/ci'
import Link from 'next/link'
import { IoSettings } from 'react-icons/io5'
import { usePathname } from 'next/navigation';
export default function SideBar() {
    const MenuList = [
        {
            title: "Dashboard",
            icon: MdDashboard,
            link: "/dashboard"
        },
        {
            title: "History",
            icon: FaHistory,
            link: "/dashboard/users"
        },
        {
            title: "Billing",
            icon: FaCartPlus,
            link: "/dashboard/settings"
        },
        {
            title: "Settings",
            icon: IoSettings ,
            link: "/dashboard/settings"
        },
    ]
    const path=usePathname();

    return (
        <div className="h-screen p-5 shadow-md border">
            <div className="flex justify-center">
                <Image src={Logo} alt="logo" className="w-28 h-auto " />
            </div>
            <div className="mt-8">
                {MenuList.map((menu, index) => (
                    <Link key={index} href={menu.link}>
                    <div
                      className={`flex items-center space-x-2 p-2 py-3 mb-2 rounded-md cursor-pointer hover:bg-custom hover:text-white ${
                        path === menu.link && "bg-custom text-white"
                      }`}
                    >
                      <menu.icon className="text-2xl" />
                      <span>{menu.title}</span>
                    </div>
                  </Link>
                ))}
            </div>

        </div>
    )
}
