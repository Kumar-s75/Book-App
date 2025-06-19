// import React from 'react'

// const ImageUpload = () => {
//   return (
//     <div>ImageUpload</div>
//   )
// }

"use client"

// export default ImageUpload
import { Image, ImageKitProvider } from '@imagekit/next';
import { useState } from 'react';


const authenticator=async()=>{
    try{
         const response=await fetch(input:`${config.env.apiEndPoint}/api/auth/imagekit`);

         if(!response.ok){
            const errorText=await response.text();

            throw new Error(message:`Request failed with status ${response.status}:${errortext}`

            );
         }

         const data=await response.json();
         const {signature,expire,token}=data;


         return {
            token,
            expire,
            signature
         };
    }catch(error:any){
        throw new Error(message:`Authentication request failed: ${error.message}`);
    } }



// export default function Page() {
//   return (
//     <ImageKitProvider urlEndpoint="https://ik.imagekit.io/your_imagekit_id">
//       <Image
//         src="/profile.png"
//         width={500}
//         height={500}
//         alt="Picture of the author"
//       />
//     </ImageKitProvider>
//   )
// } 

const ImageUpload=()=>{
  const ikUploadRef=useRef(initialValue:null);
  const [file,setFile]=useState<{filePath:string|null}>(initialState:null);


const onError=()=>{}
const onSuccess=()=>{}


    return (<ImageKitProvider 
     publicKey={publicKey}
     urlEndpoint={urlEndpoint}
      authenticator={authenticator}
      >

<IKUpload 
 className="hidden"
 ref={ikUploadRef}
 onError={onError}
 onSuccess={onSuccess}
 filename="test-upload.png"
/>
<button className='upload-btn'>
<Image src="/icons/upload.svg" alt="upload-icon" width={20} height={20} className="object-container"/>

<p className='text-base text-light-100 my-8 mx-10'  >Upload a File</p>
</button>
    </ImageKitProvider>
    );
};

export default ImageUpload;
