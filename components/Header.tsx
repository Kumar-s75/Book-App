"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import clsx from "clsx"; // or use your custom cn function

const Header = ({session}:{session:Session}) => {
  const pathname = usePathname();



  return (
    <header className="my-10 flex justify-between items-center gap-5">
      <Link href="/" className="text-xl font-bold">
        <img src="/icons/logo.svg" alt="logo" width={40} height={40}/>
      </Link>

      <ul className="flex flex-row items-center gap-5">
        <li>
          <Link
            href="/library"
            className={clsx(
              "text-base cursor-pointer capitalize",
              pathname === "/library" ? "text-light-200" : "text-light-100"
            )}
          >
            Library
          </Link>
        </li>
        <li>
<Link href='/my-profile'>
<Avatar>
  {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
  <AvatarFallback className="bg-amber-100">
    {getInitials(name:session?.user?.name||"IN")}
    {/* {session?.user?.name} */}
  </AvatarFallback>
</Avatar>
</Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
