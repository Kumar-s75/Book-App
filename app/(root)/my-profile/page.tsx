
import { signOut } from '@/auth';
import BookList from '@/components/BookList';
import { sampleBooks } from '@/constants';
import React from 'react'

const page = () => {
  return <>
  <form action={async()=>{
    'use server';

    await signOut();
  }}
  className='mb-10'
  >
    <Button className="">Logout</Button>
  </form>
  <BookList title="borrowed books" books={sampleBooks} />
  </>
}

export default page