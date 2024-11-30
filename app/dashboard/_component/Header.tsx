import { Search } from 'lucide-react'
import React from 'react'

export default function Header() {
    return (
        <div className=" p-3 md:p-5 shadow-md border-b-2 flex flex-col md:flex-row justify-between items-center md:pb-8 gap-2 md:gap-4">
            {/* Search Bar */}
            <div className="flex gap-2 items-center p-2 border rounded-md w-full md:w-1/3 bg-slate-50">
                <Search />
                <input type="text" placeholder="Search" className="w-full outline-none bg-slate-50 " />
            </div>

            {/* Membership Button */}
            <div className="w-full md:w-auto text-center">
                <h2 className="bg-custom text-white p-2 px-6 border rounded-xl text-sm md:text-base">
                    Join MemberShip just for $9.99/Month
                </h2>
            </div>
        </div>

    )
}
