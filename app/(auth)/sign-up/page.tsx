
import AuthForm from '@/components/authform'
import { signUpSchema } from '@/lib/validations'
import React from 'react'

const page = () => {

<AuthForm 
type="SIGN_UP"
schema={signUpSchema}
defaultSchema={{
    email:"",
    password:"",
     fullName:'',
     universityId:0,
     universityCard:""
}}
/>

}

export default page