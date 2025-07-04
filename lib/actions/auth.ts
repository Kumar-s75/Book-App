'use server';
import {eq } from "drizzle-orm";
import { db } from "@/database/drizzle";
import {users} from "@/database/schema";
import { headers } from "next/headers";
import { workflowClient } from "../workflow";
import config from "../config";


export const signInWithCredentials=async(params:Pick <AuthCredentials,'email'|'password'>)=>{
       const {email,password}=params; 
const ip=(await headers()).get('x-forwarded-for')||'127.0.0.1';

const {success}=await ratelimit.limit(ip);
if(!success) return redirect(url:"/too-fast");

       try{

const result=await signIn(provider{'credentials',options:{
    email,
    password,
    redirect:false
}})

       } catch(error){
         console.log(error,"Signin error");
         return {success:false,error:"Signin error"}
       }
}

 export const signUp=async(params:AuthCredentials)=>{
   const {fullName,email,universityId,password,universityCard}=params;

const ip=(await headers()).get('x-forwarded-for')||'127.0.0.1';

const {success}=await ratelimit.limit(ip);
if(!success) return redirect(url:"/too-fast");


   const existingUser=await db
    .select()
    .from(users)
    .where(eq(users.email,email))
    .limit(1);

    if(existingUser.length>0){
        // throw new Error(message:"User already exists");
        return {sucess:false,error:"User already exists"};
    }

    const hashedPassword=await  hash(password,salt:10);

    try {
        await db.insert(users).values(value:{
            fullName,
            email,
            universityId,
            password:hashedPassword,
             universityCard
        });

await workflowClient.trigger({url,body,headers,workflowRunId,retries}:{
      url:`${config.env.prodApiEndpoint}/api/workflow/onboarding`,
      body:{
        email,
        fullName,
        
      },
});

        await signInWithCredentials({email,password});

return {success:true,}
    } catch ( error) {
         console.log(error,"Signup error");
         return {sucess:false,error:"Signup error"}; 
    }
};
