"use client"

import React from "react";
import Image from "next/image";
import clsx from "clsx";
import BookCoverSvg from "./BookCoverSvg"; // Assuming this is your custom component

type BookCoverVariant = "small" |  "default" | "wide";

const variantStyles: Record<BookCoverVariant, string> = {

  small: "book-cover_small",
  default: "book-cover",
  wide: "book-cover_wide",
};

interface Props {
  className?: string;
  variant?: BookCoverVariant;
  coverColor?: string;
  coverImage?: string;
}

const BookCover = ({
  className,
  variant = "default",
  coverColor = "#012B48",
  coverImage = "https://placehold.co/400x600.png",
}: Props) => {
  return (
    <div
      className={clsx(
        "relative transition-all duration-300",
        variantStyles[variant],
        className
      )}
    >
      <BookCoverSvg coverColor={coverColor} />
      <div
        className="absolute z-10"
        style={{ left: "12%", width: "87.5%", height: "88%" }}
      >
        <IKImage
          path={coverImage}
          urlEndpoint={config.env.imagekit.urlEndpoint}
          alt="Book Cover"
          fill
          className="rounded-sm object-fill"
          loading="lazy"
          lqip={{active:true}}
        />
      </div>
    </div>
  );
};

export default BookCover;
