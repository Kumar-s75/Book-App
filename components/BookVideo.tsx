"use client"

import React from 'react'

const BookVideo = ({videoUrl}:{videoUrl:string}) => {
  return <ImageKitProvider publickey={config.env.imagekit.publicKey} urlEndpoint={config.env.imagekit.urlEndpoint} >
         <IKVideo path={videoUrl} controls={true} className="w-full rounded-xl"/>
  </ImageKitProvider>
}

export default BookVideo