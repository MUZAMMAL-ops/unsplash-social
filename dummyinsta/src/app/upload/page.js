"use client"
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/6JnUvjt9Ags
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import useGet from "../useget"
import axios from "axios"
import {useRouter} from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Description } from "@radix-ui/react-toast"
import { ProgressDemo}  from "./progress"
import { FanIcon } from "lucide-react"
import Description1 from "./Description"
import useAuth from "../auth"
// import { Label } from "@/components/ui/label"
// import { Input } from "@/components/ui/input"
export default function Component() {
  const [url,seturl] = useState('');
  const [isimage,setisimage] = useState(false)
  const [loading, setloading] = useState(true); // New state for loading status
  const [description,setDescription] = useState('')
  const { isAuthenticated, loading1, err } = useAuth()
  const router = useRouter()
  console.log('description',description);
  

  const {toast} = useToast()
  const Token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJpYXptdXphbW1hbDM1MEBnbWFpLmNvbSIsImlhdCI6MTcyNjM5MDc4OX0.Os2WVCOedXxlSy4OtQQa0K-gQt1U4CRHJWk2FoHmITs'
console.log(isimage);

  const urlApi = (e) => {
    seturl(e.target.value)
    setisimage(false)
  }
  const resetForm = () => {
     setloading(true)
    seturl('');
    setisimage(false);
    setDescription('')  // Reset isImage after each submission
  };

  const GetMetaData = (e) => {
          e.preventDefault()
          if (isimage) {
            axios.post('http://localhost:5000/upload',{url:url,Description:description},{
              headers:{
                authorization: `bearer ${Token}`
              }
            })
            .then(response=>{
              console.log(response);
              setloading(true)
               resetForm()
                toast({
                  variant:'success',
                  description:"The Photo has been posted"
                })
                
            })
            .catch(error=>{
              console.log(error);
              
              toast({
                variant:"destructive",
                description:"Some Error occured please try again"
              })
            })
            
          }else{

            toast({
              variant:"destructive",
              description:"The URL is not valid,Please insert some valid URL ! or check your Internet Connection"
            })
          }
        
        
  }
  const imageVerification = (e) =>{
    setloading(false)
     setisimage(false)
  }
  const imageVerification1 = (e) =>{
    setloading(false)
    setisimage(true)
 }
 
 const updateDescription = (e) => {
     setDescription(e.target.value)
 }
 if (loading1) {
  return <h3 className="flex justify-center mt-60">Loading...</h3>
}
if (err || (!isAuthenticated && !loading1)) {
  router.push('/login'); // Redirect to login if there's an error or not authenticated
  return null; // Return null to prevent rendering during redirection
}
  return (
    <>
    <div className=" justify-center hidden">
    <img src={url} width={200} height={200}  onError={imageVerification} onLoad={imageVerification1}  />

    </div>
    <div className="mx-auto max-w-md space-y-6 py-12 mt-28">

      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Submit a URL</h1>
        <p className="text-muted-foreground">Enter a URL to get started.</p>
      </div>
      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="url">URL</Label>
          <Input id="url" type="url" value={url} onChange={urlApi} placeholder="https://example.com" required />
        </div>
        <div className="grid w-full  items-center gap-1.5" >
      <Label htmlFor="name">Description</Label>
      <Input type="text" onChange={updateDescription} value={description}  id="name" placeholder="Describe your pic..." required  />
    </div>
        <Button type="submit" onClick={GetMetaData}   className="w-full" disabled={loading}>
          {url&&loading?<ProgressDemo/>:'submit'}
        </Button> 

      </form>

    </div>
    </>
  )
}