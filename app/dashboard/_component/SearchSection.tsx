import { Search } from 'lucide-react'
import React from 'react'

export default function SearchSection({onSearchInput}:{onSearchInput:(value:string)=>void}) {
  return (
    <div className="p-6 md:p-8 bg-gradient-to-br from-[#614385] via-[#662D8C] to-[#516395] flex flex-col justify-center items-center text-white">
      <h1 className="text-3xl font-semibold ">Browse All Template</h1>
      <p>What would you like to explore today?</p>
     
        <div className="flex gap-2 items-center p-2 border rounded-md mt-4 w-full md:w-1/2 bg-slate-100">
          <Search className="text-primary" />
          <input type="text" placeholder="Search" className="w-full outline-none bg-transparent text-black"  onChange={(event)=>onSearchInput(event.target.value)}/>
        </div>
     
    </div>
  )
}
