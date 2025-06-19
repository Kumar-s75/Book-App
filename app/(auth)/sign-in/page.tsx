'use client';


import AuthForm from '@/components/authform'
import { signInSchema } from '@/lib/validations'
import React from 'react'

const page = () => {

<AuthForm 
type="SIGN_IN"
schema={signInSchema}
defaultSchema={{
    email:"",
    password:""
}}
onSubmit={()=>{}}
/>

}

export default page