'use client'
import { adminSideBarLinks } from '@/constants'
import { PathnameContext } from 'next/dist/shared/lib/hooks-client-context.shared-runtime';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { Avatar } from '../ui/avatar';

const Sidebar = ({session}:) => {
  return (
    <div className='admine-sidebar'> 
     {/* <div className="">
        <div className="logo">
<Image src="/icons/admin/logo.svg" alt="logo" height={37} width={37}/>
<h1>BookWise</h1>
        </div> */}
        <div className="mt-10 flex flex-col gap-5">
              {[adminSideBarLinks.map((link)=>{
                const isSelected=(link.route!==='/admin' && Pathname.includes(link.route)&& link.route.length>1)||pathname===link.route; 
                  const pathname=usePathname();
                return(
                    <Link href={link.route} key={link.route}>
                        <div className={cn(
                            inputs:'link',
                            isSelected && "bg-primary-admin shadow-sm",
                            )}>
                                 <div className="relative size-5 ">
                                               <Image src={link.img} alt="icon" fill className={`${isSelected} ? 'brightness-0 invert': ''object-contain `}/>
                                 </div>


                                 <p className={cn(inputs:isSelected?'text-white':'text-dark')}>{link.text}</p>
                        </div>
                    </Link>
                )
              })]}
        </div>
    </div>

    <div className="user">
         <Avatar>
  {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
  <AvatarFallback className="bg-amber-100">
    {getInitials(name:session?.user?.name||"IN")}
    {/* {session?.user?.name} */}
  </AvatarFallback>
</Avatar>
<div className="flex flex-col max-md:hidden">
    <p className='font-semibold text-dark-200'>{session?.user?.name</p>
    <p className="text-xs text-light-500">{session?.user?.email </p>
</div>
    </div>
    </div>
  )
}

export default Sidebar