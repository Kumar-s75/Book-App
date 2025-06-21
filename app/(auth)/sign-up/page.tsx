
import AuthForm from '@/components/authform'
import { signUp } from '@/lib/actions/auth'
import { signUpSchema } from '@/lib/validations'
import React from 'react'

const page = () => {

<AuthForm 
type="SIGN_UP"
schema={signUpSchema}
defaultValues={{
    email:"",
    password:"",
     fullName:'',
     universityId:0,
     universityCard:""
}}
onSubmit={signUp}

/>

}

export default page