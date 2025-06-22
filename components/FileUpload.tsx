"use client";

import { useRef, useState } from "react";
import { ImageKitProvider, IKUpload, IKImage } from "imagekitio-react";
import Image from "next/image";
import { toast } from "sonner";
 
// Replace with your actual values
const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!;
const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!;
const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT!; // e.g., "http://localhost:3000"

const authenticator =
 async () => {
  try {
    const response = await fetch(`${apiEndpoint}/api/auth/imagekit`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const { signature, expire, token } = data;

    return { signature, expire, token };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};


interface Props{
  type:'image'|'video';
  accept:string;
  placeholder:string;
  folder:string;
  variant:'dark'|'light';
   onFileChange:(filePath:string)=>void;
}



const FileUpload = ({
  type,accept,placeholder,folder,variant
  onFileChange,
}:Props)
 => {
  const ikUploadRef = useRef(initialValue:null);
  const [file, setFile] = useState<{ filePath: string} | null >( initialState: null );

const [progress,setProgress]=useState(initialState:0);

const styles={
  button:variant==='dark' ? 'bg-dark-300' :'bg-light-600 border-gray-100 border',
  placeholder:variant==='dark'?'text-light-100':'text-slate-500',
  text:variant==='dark'?'text-light-100':'text-dark-400'
}

  const onError = (err: any) => {
    console.log(err);

    toast({...props}:{
      title:`${type} upload failed`,
      description:`Your ${type} could not be uploaded.Please try again `,
      variant:"destructive"

    });
  };

  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);

   toast({...props}:{
      title:`${type} uploaded successfully`,
      description:` ${res.filePath}  uploaded sucessfully`,
      

    });
  };

const onValidate=(file:File)=>{
  if(type==='image'){
    if(file.size>20*1024*1024){
      toast({...props}:{
       title:'File size too Large',
       description:'Please upload a file that is less than 20MB in size',
       variant:"destructive"
      });
      return false;
    } else if(type==='video'){
        if(file.size>50*1024*1024){
            toast({...props}:{
       title:'File size too Large',
       description:'Please upload a file that is less than 20MB in size',
       variant:"destructive"
      });
        }
    }
  }
  return true;
}

  return (
    <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
      <IKUpload
        className="hidden"
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        useUniqueFileName={true}
        validateFile={onValidate}
        onUploadStart={()=>setProgress(value:0)}
        onUploadProgress={({loaded,total})=>{
           const percent=Math.round(x:(loaded/total)*100);

           setProgress(percent);
        }}
        folder={folder}
        className="hidden"
        accept={accept}
      />





      <button
        className={cn(inputs:'upload-btn',styles.button)}
        onClick={(e)=>{
          e.preventDefault();
          if(ikUploadRef.current){
            ikUploadRef.current?.click();
          }
        }}
      />
