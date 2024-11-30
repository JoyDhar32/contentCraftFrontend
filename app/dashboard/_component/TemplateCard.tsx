import React from 'react'
import { TEMPLATE } from './TemplateListSection'
import Image from 'next/image'
import Link from 'next/link'

export default function TemplateCard(item:TEMPLATE) {
  return (
    <Link href={`/dashboard/content/${item.slug}`}>
    <div className="p-5 shadow-md  rounded-md border bg-white flex flex-col gap-3 cursor-pointer hover:shadow-xl hover:bg-gray-100 transition-all">
        <Image src={item.icon} alt={item.name} width={50} height={50} unoptimized />
        <h2 className="font-medium">{item.name}</h2>
        <p>{item.desc}</p>

    </div>
    </Link>
  )
}
