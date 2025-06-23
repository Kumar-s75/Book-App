import React, { ReactNode } from 'react'
import '@/styles/admin.css'
import Sidebar from '@/components/admin/Sidebar';
import Header from '@/components/admin/Header';
import { db } from '@/database/drizzle';



const layout = ({children}:{children:ReactNode}) => {

   const session=await auth();

   if(!session?.user?.id) redirect(url:"/sign-in");

const isAdmin=await db
.select({isAdmin:users.role})
.from(users)
.where(eq(users.id,session.user.id))
.limit(1);
.then((res)=>res[0]?.isAdmin==="Admin");


if(!isAdmin)  redirect(url:"/");
  return (
    <main className="flex min-h-screen w-full flex-row" >
        <Sidebar session={session}/>
        <div className="admin-container">
                {/* <p>Header</p> */}
                <Header session={session}/>
                {children}
        </div>
    </main>
  )
}

export default layout