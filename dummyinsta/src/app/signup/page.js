"use client"
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/coIhgvzPDUB
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm,Controller } from "react-hook-form"
import { useState, useEffect } from "react"
import usePost from "../posthook"
import { useToast } from "@/hooks/use-toast"
import Router, { useRouter } from "next/navigation"
import Link from "next/link"
import Skeleton from "react-loading-skeleton"


export default function Signup() {
  const form = useForm();
  const {register,control,handleSubmit, formState,resetField,reset} = form;
  const {errors} = formState;
  const {data1, loading, error, postData,setError,setData1 } = usePost()
  const [formData,setformData] = useState(null)
  const {toast} = useToast()
  const router = useRouter()

  const onSubmit = (data) => {
    
        if (data) {
          setformData(data)
          postData('http://localhost:5000/signup',data,{'content-type':'application/json'})
        }
  }

  useEffect(() => {

    if (data1?.Token) {
      localStorage.setItem("Token",data1.Token)
      toast({
        variant:"success",
        description:"Successfully Signed up "
      })
      reset()
      setTimeout(() => {
        router.push('/image')
      }, 2000);
    }
    if (data1?.message) {
      toast({
        variant: "destructive",
        description:data1.message
      })
      setData1(null)
    }
    if (error) {
      toast({
        variant: "destructive",
        description:"Some Error Occured Please Try Again !"
      })
    }
    
  }, [data1,error])
  


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0F2027] to-[#203A43] overflow-hidden">
      <div className="relative w-full max-w-md px-6 py-12 bg-background rounded-lg shadow-lg z-10">
        <div className="absolute inset-0 -z-10 animate-twinkle">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0F2027] to-[#203A43] opacity-90">
            <div>
              <div />
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold"> {loading?"verifying...":"Sign up"}</h1>
            <p className="text-muted-foreground">Enter your email and password to register.</p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="Email" type="email" placeholder="m@example.com"  {...register("Email", {
              required:'Email is required',
              pattern:{
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                 message:'invalid email format'
              }

              })}/>
              <p className='text-yellow-200'>{errors.email?.message}</p>

            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="Password" type="password" {...register("Password", {
              required:'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters long',

             }

              })} />
               <p className='text-yellow-200'>{errors.Password?.message}</p>

            </div>
            <Button type="submit" className="w-full" disabled={loading}>
            {loading?<Skeleton width={100} height={10}/>:"Sign up"}
            </Button>
          </form>
          <p>Already have an Account <Link href={'/login'} className="text-red-500">log in</Link></p>
        </div>
      </div>
    </div>
  )
}