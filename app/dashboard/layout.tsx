import React from 'react'
import SideBar from './_component/SideBar';
import Header from './_component/Header';

export default function layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div className="bg-slate-100 min-h-screen"> 
        <div className="md:w-64 hidden md:block fixed">
            <SideBar />
        </div>
        <div className="md:ml-64">
            <Header />
         {children}
         
         </div>
         </div>
  )
}
