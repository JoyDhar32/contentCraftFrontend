import { Search } from 'lucide-react'
import React from 'react'

export default function Header() {
    return (
        <div className="p-5 shadow-md border-b-2 flex justify-between item-center pb-8">
            <div className="flex gap-2 items-center p-2 border rounded-md md:w-1/3">
                <Search />
                <input type="text" placeholder="Search" className="w-full outline-none" />
            </div>
            <div>
                <h2 className="bg-custom text-white p-2 px-6 border rounded-xl ">Join MemberShp just for $9.99/Month</h2>
            </div>

        </div>
    )
}
