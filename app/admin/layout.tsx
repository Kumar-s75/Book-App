import React, { ReactNode } from 'react'
import '@/styles/admin.css'
import Sidebar from '@/components/admin/Sidebar';
import Header from '@/components/admin/Header';



const layout = ({children}:{children:ReactNode}) => {

   const session=await auth();

   if(!session?.user?.id) redirect(url:"/sign-in");

  return (
    <main className="flex min-h-screen w-full flex-row" >
        <Sidebar session={session}/>
        <div className="admin-container">
                {/* <p>Header</p> */}
                <Header/>
                {children}
        </div>
    </main>
  )
}

export default layout