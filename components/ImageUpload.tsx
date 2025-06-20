"use client";

import { useRef, useState } from "react";
import { ImageKitProvider, IKUpload, IKImage } from "imagekitio-react";
import Image from "next/image";
import { toast } from "sonner";
 
// Replace with your actual values
const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!;
const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!;
const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT!; // e.g., "http://localhost:3000"

const authenticator = async () => {
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

const ImageUpload = ({onFileChange,}:{onFileChange:
  (filePath:string)=>void; })
 => {
  const ikUploadRef = useRef(initialValue:null);
  const [file, setFile] = useState<{ filePath: string} | null >( initialState: null );

  const onError = (err: any) => {
    console.log(error);
  };

  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filePath);

    toast.success("Image uploaded successfully!");
  };

  return (
    <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
      <IKUpload
        className="hidden"
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        filename="test-upload.png"
      />

      <button
        className="upload-btn flex items-center gap-4"
        onClick={() => ikUploadRef.current?.click()}
      />
