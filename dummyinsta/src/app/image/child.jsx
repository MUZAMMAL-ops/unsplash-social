"use client"
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/VKC2hEhSEHj
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import Link from "next/link"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import usePost from "../posthook"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useContext, useEffect, useState } from "react"
import { MyContext1 } from "../infinitteContext"
import usePatch from "../patchHook"
import usePost5 from "../GetHook"
import Postcomment from './Comment'
import { v4 as uuidv4 } from  'uuid'
import { closeit } from "../closecomment"

export default function  Datadisplay ({ImageURL,id,Like,Des}){
  const {data1, loading, error, postData,setError,setData1} = usePost();
  const {data2, loading1, error1, postData1,setError1,setData2} = usePatch()
  const {data5, loading5, error5, postData5,setError5,setData5} = usePost5()
  const [like,setlike] = useState(Like)
  const [color,setcolor] = useState()
  const [comment,setcomment] = useState(false);
  const {closestate,setclosestate} = useContext(closeit)

  const generate = uuidv4()
  // const {load1,setload1} = useContext(MyContext1)
  const Token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJpYXptdXphbW1hbDM1MEBnbWFpLmNvbSIsImlhdCI6MTcyNjI5OTEyMn0.KGD7TYzueq3VM0PaGs-MJUUfHIv4Rxq0G-ltWb-7oaM'
    //  setload1(id)
  useEffect(() => {
    if (id) {
      // setcomment(false)

      postData('http://localhost:5000/posts-map',{id:id},{authorization:`bearer ${Token}`})
    }
  }, [id])

  // useEffect(() => {
  //  if (closestate === false) {
  //   setcomment(false)
  //  }

  // }, [closestate])
  

  const handleLikes =  () => {
      postData1('http://localhost:5000/likes',{id:id},{authorization:`bearer ${Token}`})
      setlike(like+1)
  }
  
  // useEffect(() => {
  //   postData5('http://localhost:5000/get-like',{id:id},{authorization:`bearer ${Token}`})
  // }, [data2])
  
  // console.log('data5',data5);
  
  
   
useEffect(() => {
  if (data2) {
    console.log('data2',data2);
    
    setcolor(true);
  } else {
    setcolor(false);
  }
}, [data2]);

  // if (data2) {
  //   setcolor(true)
     
  // }else{
  //   setcolor(false)
  // }
  
  
  console.log('data1',data1)
  console.log('error',error);
  // useEffect(() => {
  //   if (data5) {
  //     setlike(data5[0]?.Likes)
  //   }
  // }, [data5]);
  

  const renderComment = (e) => {
       setcomment(!comment)
  }
  
  
  return (
    <>
    <Card className="w-full max-w-sm ml-120 mt-0">
      <CardHeader className="flex flex-row items-center p-4">
        <Link href="#" className="flex items-center gap-2 text-sm font-semibold" prefetch={false}>
          <Avatar className="w-8 h-8 border">
            <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
            <AvatarFallback>AC</AvatarFallback>
          </Avatar>
          Acme Inc
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="w-8 h-8 ml-auto rounded-full">
              <MoveHorizontalIcon className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <BookmarkIcon className="w-4 h-4 mr-2" />
              Save
            </DropdownMenuItem>
            <DropdownMenuItem>
              <StarIcon className="w-4 h-4 mr-2" />
              Add to favorites
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <FileWarningIcon className="w-4 h-4 mr-2" />
              Report
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="p-0">
        {/* <Image src={URL.createObjectURL(ImageURL)} width='400' height='400' alt="image" className="object-cover aspect-square"/> */}
        <img src={ImageURL} width={400} height={400} onDoubleClick={handleLikes} alt="image" className="object-cover aspect-square"/>
      </CardContent>
      <CardFooter className="grid gap-2 p-2 pb-4">
        <div className="flex items-center w-full">
          <Button variant="ghost" size="icon">
            {/* <HeartIcon className="w-4 h-4" /> */}
            <HeartIcon color={color ? 'red' : 'orange'} className="w-4 h-4" />
            <span className="sr-only">Like</span>
          </Button>
          <Button variant="ghost" size="icon" onClick={renderComment}>
            <MessageCircleIcon className="w-4 h-4" />
            <span className="sr-only">Comment</span>
          </Button>
          <Button variant="ghost" size="icon">
            <SendIcon className="w-4 h-4" />
            <span className="sr-only">Share</span>
          </Button>
          <Button variant="ghost" size="icon" className="ml-auto">
            <BookmarkIcon className="w-4 h-4" />
            <span className="sr-only">Comment</span>
          </Button>
        </div>
        <div className="px-2 text-sm w-full grid gap-1.5">
          <div>
            <Link href="#" className="font-medium" prefetch={false}>
              {/* john */}
            </Link>
            {Des}
            {/* Wow, this photo is absolutely stunning! 😍✨ */}
          </div>
          <div>
            
              <span className="font-medium">{like}  Likes</span>

            
          </div>
        </div>
      </CardFooter>
    </Card>{
      comment&&<Postcomment key={generate} id={id}/>
      // comment?<Postcomment key={generate} id={id} />:null
    }
    
    </>
  )
}

function BookmarkIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  )
}


function FileWarningIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
    </svg>
  )
}


function HeartIcon({ color = 'transparent', ...props}) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={color}
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}


function MessageCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  )
}


function MoveHorizontalIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="18 8 22 12 18 16" />
      <polyline points="6 8 2 12 6 16" />
      <line x1="2" x2="22" y1="12" y2="12" />
    </svg>
  )
}


function SendIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  )
}


function StarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}