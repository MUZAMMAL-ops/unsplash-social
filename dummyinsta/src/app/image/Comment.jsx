"use client"
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/Fx3pvzDdOQV
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState,useEffect, useContext } from "react"
import usePost from "../posthook"
import { useToast } from "@/hooks/use-toast"
import { Description } from "@radix-ui/react-toast"
import { data } from "autoprefixer"
import { Commentcontext } from "../CommentIdContext"
import DisplayComments from "./Display"
import Parent from "./Parent"
import { NewComment } from "../newcommentcontext"
import { closeit } from "../closecomment"



export default function Postcomment({id}) {
  const { data1, loading, error, postData,setError,setData1} = usePost()
  const [post,setpost] = useState('');
  const {toast} = useToast()
  const {load1,setload1} = useContext(Commentcontext)
  const {newcomm,setnewcomm} = useContext(NewComment)
  const {closestate,setclosestate} = useContext(closeit)

  useEffect(() => {
    setload1(id)

  }, [id,newcomm])

  // useEffect(() => {
  //   setclosestate(false)
  // }, [id])
  
  

  console.log('post1',post);
  const Token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJpYXptdXphbW1hbDM1MEBnbWFpLmNvbSIsImlhdCI6MTcyNjI5OTEyMn0.KGD7TYzueq3VM0PaGs-MJUUfHIv4Rxq0G-ltWb-7oaM'

  const sendComments = (e) => {
    setpost(e.target.value)
  }
  const saveComment = () => {
        if (post) {
          postData('http://localhost:5000/post-comment',{Comment:post,id:id},{authorization:`bearer ${Token}`})
        }
  }

  useEffect(() => {
    if (error) {
       toast({
        variant:"destructive",
        description:"Comment was not posted , Please try again !"
      })

    }else if(data1){
          setpost('')
           toast({
            variant:"success",
            description:"Comment Posted !"
          })
     setnewcomm(data1)
        }
  }, [data1,error,setnewcomm])
  
  
  
  return (
    <Card className="w-full  max-w-sm ml-120 mt-0">
      <CardHeader>
        <CardTitle>Comments</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 max-h-[300px] overflow-y-scroll">
        <ScrollArea className="">
          <div className="">
             <Parent/>
            </div>
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <div className="flex gap-2">
          <Input type="text" placeholder="Write a comment..." value={post} onChange={sendComments} className="flex-1" />
          <Button type='submit' onClick={saveComment}>Post</Button>
        </div>
      </CardFooter>
    </Card>
  )
}