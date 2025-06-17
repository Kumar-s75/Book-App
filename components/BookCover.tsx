import React from 'react'

type BookCoverVariant="extraSmall"|"small"|"medium"|"regular"|"wide";

const variantStyles:Record<BookCoverVariant,string>={
    extraSmall:'book-cover_extra_small',
    small:'book-cover_extra_small',
    medium:'book-cover_extra_small',
    regular:'book-cover_regular',
    wide:'book-cover_wide',
}

interface Props{
     className?:string;
     variant?:BookCoverVariant;
     coverColor:string;
     coverUrl:string;
}

const BookCover = ({
    className,
    variant,
    coverColor,
    coverUrl
}:Props) => {
  return (
    <div>BookCover</div>
  )
}

export default BookCover