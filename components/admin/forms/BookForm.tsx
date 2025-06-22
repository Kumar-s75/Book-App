
"use client";

import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  SubmitHandler,
  FieldValues,
  DefaultValues,
  Path,
  UseFormReturn,
} from "react-hook-form";
import { z, ZodType } from 'zod';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from 'next/link';
import { FIELD_NAMES, FIELD_TYPES } from '@/constants';
import ImageUpload from './ImageUpload';
import { toast } from 'sonner';
import { bookSchema } from '@/lib/validations';
import { Textarea } from '@/components/ui/textarea';
import ColorPicker from '../ColorPicker';

interface Props extends Partial<Book> {
 type?:'create'|'update';
}

const BookForm = ({
  type,
  ...book,
}: Props) => {
  const router=useRouter();
  const isSignIn = type === "SIGN_IN";

  const form:UseForm<z.infer<typeof bookSchema>> = useForm<T>({
    resolver: zodResolver(bookSchema),
    defaultValues:{
        title:"",
        description:"",
        author:"",
        genre:"",
        rating:"",
        totalCopies:"",
        coverUrl:"",
        coverColor:"",
        videoUrl:"",
        summary:""
        
    }
  });

const onSubmit=async(values:z.infer<typeof bookSchema>)=>{
  console.log(values);
}

//   const handleSubmit: SubmitHandler<T> = async (data) => {
//     const result = await onSubmit(data);
//     if (result.success) {
//       // console.log("success");
//       toast({
//         title:'Success',
//         description:isSignIn?"You have successfully signed in.":"You have successfully signed up"
//       });
//       router.push(href:"/");
//     } else{
//       toast({...props}:{
//              title:`Error ${isSignIn ? "signing in" :"signing up"}`,
//              description:result.error ?? "An error occurred.",
//              variant:"destructive",
//       })
//     }
//   };

  return (
    // <div className="flex flex-col gap-4">
    //   <h1 className="text-2xl font-semibold text-white">
    //     {isSignIn ? 'Welcome Back to BookApp' : 'Create your library account'}
    //   </h1>
    //   <p className="text-light-100">
    //     {isSignIn ? 'Sign in to continue' : 'Sign up to get started'}
    //   </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        
            <FormField
              key={fieldName}
              control={form.control}
              name={fieldName as Path<T>}
              render={({ field }) => (
                <FormItem className='flex flex-col gap-1'>
                  <FormLabel className="text-base font-normal text-dark-500">
                    Book Title
                  </FormLabel>
                  <FormControl>
                      <Input
                        required
                        placeholder="Book title"
                        {...field}
                        className="book-form_input"
                      />
                     
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          

            <FormField
              control={form.control}
              name={"author"}
              render={({ field }) => (
                <FormItem className='flex flex-col gap-1'>
                  <FormLabel className="text-base font-normal text-dark-500">
                    Author
                  </FormLabel>
                  <FormControl>
                      <Input
                        required
                        placeholder="Book author"
                        {...field}
                        className="book-form_input"
                      />
                     
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            
         <FormField
              control={form.control}
              name={"genre"}
              render={({ field }) => (
                <FormItem className='flex flex-col gap-1'>
                  <FormLabel className="text-base font-normal text-dark-500">
                  Genre
                  </FormLabel>
                  <FormControl>
                      <Input
                        required
                        placeholder="Book genre"
                        {...field}
                        className="book-form_input"
                      />
                     
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />



            <FormField
              control={form.control}
              name={"rating"}
              render={({ field }) => (
                <FormItem className='flex flex-col gap-1'>
                  <FormLabel className="text-base font-normal text-dark-500">
                 Rating
                  </FormLabel>
                  <FormControl>
                      <Input
                       type="number"
                       min={1}
                       max={5}
                        placeholder="Book rating"
                        {...field}
                        className="book-form_input"
                      />
                     
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={"totalCopies"}
              render={({ field }) => (
                <FormItem className='flex flex-col gap-1'>
                  <FormLabel className="text-base font-normal text-dark-500">
                 Total Copies
                  </FormLabel>
                  <FormControl>
                      <Input
                       type="number"
                       min={0}
                       max={10000}
                        placeholder="Total Copies"
                        {...field}
                        className="book-form_input"
                      />
                     
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> 

             <FormField
              control={form.control}
              name={"Coverurl"}
              render={({ field }) => (
                <FormItem className='flex flex-col gap-1'>
                  <FormLabel className="text-base font-normal text-dark-500">
                 Book Image
                  </FormLabel>
                  <FormControl>
                   <FileUpload type="image" accept="image/*" placeholder="Upload a book cover" folder="books/covers" variant="light" onFileChange={field.onChange} value={field.value}  />
                     
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> 

            <FormField
              control={form.control}
              name={"coverColor"}
              render={({ field }) => (
                <FormItem className='flex flex-col gap-1'>
                  <FormLabel className="text-base font-normal text-dark-500">
               Primary Color
                  </FormLabel>
                  <FormControl>
                    <ColorPicker onPickerChange={field.onChange} value={field.value} />
                     
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> 
              <FormField
              control={form.control}
              name={"description"}
              render={({ field }) => (
                <FormItem className='flex flex-col gap-1'>
                  <FormLabel className="text-base font-normal text-dark-500">
               Book Description
                  </FormLabel>
                  <FormControl>
                   <Textarea placeholder="Book Description" {...field} rows={10} className="book-form_input"/>

                 
                     
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> 

             <FormField
              control={form.control}
              name={"videoUrl"}
              render={({ field }) => (
                <FormItem className='flex flex-col gap-1'>
                  <FormLabel className="text-base font-normal text-dark-500">
                                 <FileUpload type="video" accept="video/*" placeholder="Upload a book tariler" folder="books/videos" variant="light" onFileChange={field.onChange} value={field.value}  />
                  </FormLabel>
                  <FormControl>
                   <Textarea placeholder="Book Description" {...field} rows={10} className="book-form_input"/>

                 
                     
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> 

             <FormField
              control={form.control}
              name={"summary"}
              render={({ field }) => (
                <FormItem className='flex flex-col gap-1'>
                  <FormLabel className="text-base font-normal text-dark-500">
               Book Summary
                  </FormLabel>
                  <FormControl>
                   <Textarea placeholder="Book Summary" {...field} rows={5} className="book-form_input"/>

                 
                     
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> 

        <Button type="submit"  className='book-form_btn text-white'>Add Book to Library </Button>
        </form>
      </Form>
 
      {/* <p className="text-center text-base font-medium text-white">
        {isSignIn ? "New to Bookwise?" : "Already have an account?"}{" "}
        <Link
          href={isSignIn ? "/sign-up" : "/sign-in"}
          className="font-bold text-primary"
        >
          {isSignIn ? "Create an account" : "Sign in"}
        </Link>
      </p>
    </div> */}
  );
};

export default BookForm;
