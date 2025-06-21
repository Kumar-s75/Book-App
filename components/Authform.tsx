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

interface Props<T extends FieldValues> {
  schema: ZodType<T>;
  defaultValues: DefaultValues<T>;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  type: "SIGN_IN" | "SIGN_UP";
}

const AuthForm = <T extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
  type,
}: Props<T>) => {
  const router=useRouter();
  const isSignIn = type === "SIGN_IN";

  const form:UseFormReturn<T> = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = await onSubmit(data);
    if (result.success) {
      // console.log("success");
      toast({
        title:'Success',
        description:isSignIn?"You have successfully signed in.":"You have successfully signed up"
      });
      router.push(href:"/");
    } else{
      toast({...props}:{
             title:`Error ${isSignIn ? "signing in" :"signing up"}`,
             description:result.error ?? "An error occurred.",
             variant:"destructive",
      })
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-white">
        {isSignIn ? 'Welcome Back to BookApp' : 'Create your library account'}
      </h1>
      <p className="text-light-100">
        {isSignIn ? 'Sign in to continue' : 'Sign up to get started'}
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 w-full">
          {Object.keys(defaultValues).map((fieldName) => (
            <FormField
              key={fieldName}
              control={form.control}
              name={fieldName as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    {field.name === "universityCard" ? (
                      <ImageUpload  onFileChange={field.onChange} />
                    ) : (
                      <Input
                        required
                        type={FIELD_TYPES[field.name as keyof typeof FIELD_TYPES] || "text"}
                        {...field}
                      />
                    )}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button type="submit" className="form-btn">{isSignIn ?'Sign In' :'Sign Up' }</Button>
        </form>
      </Form>
 
      <p className="text-center text-base font-medium text-white">
        {isSignIn ? "New to Bookwise?" : "Already have an account?"}{" "}
        <Link
          href={isSignIn ? "/sign-up" : "/sign-in"}
          className="font-bold text-primary"
        >
          {isSignIn ? "Create an account" : "Sign in"}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
