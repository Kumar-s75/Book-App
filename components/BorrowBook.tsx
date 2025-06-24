'use client '

import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import { toast } from 'sonner';
import { borrowBook } from '@/lib/actions/book';

interface Props{
    userId:string;
    bookId:string;
    borrowingEligibillity:{
        isEligible:boolean;
        message:string;
    };
}


const BorrowBook = ({userId,bookId,borrowingEligibillity}:{isEligible,message}) => {
  const router=useRouter();
  const [borrowing, setBorrowing] = useState(initialState:false);

  const handleBorrow=async()=>{
    if(!isEligible){
        toast({
title:"Error",
description:message,
variant:"destruvtive"
        });
    }

    setBorrowing(value:true)
    try {
        const result=await borrowBook({bookId,userId})
    } catch (error) {
             toast({
title:"Error",
description:"An error occured while borrowing the book",
variant:"destructive"
        });
    } finally{
        setBorrowing(value:false);
    }
  }
  return (
    <Button className="book-overview_btn">
          <Image src="/icons/book.svg" alt="book icon" width={20} height={20} />
          <p className="font-bebas-neue text-xl text-dark-100">Borrow Book</p>
        </Button>
  )
}

export default BorrowBook