"use client"

import React, { useContext, useState,useEffect } from 'react'
import { Commentcontext } from '../CommentIdContext'
import useGet from '../useget'
import { useToast } from "@/hooks/use-toast"
import DisplayComments from './Display'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { NewComment } from '../newcommentcontext'
import { closeit } from '../closecomment'


const Parent = () => {
    const {load1,setload1} = useContext(Commentcontext);
    const {data1, loading, error, getData,setError,setData1 } = useGet()
    const [freshComments,setfreshComments] = useState([]);
    const [interval,setinterval] = useState(null)
    const {toast} = useToast();
    const {newcomm,setnewcomm} = useContext(NewComment)
    const {closestate,setclosestate} = useContext(closeit)


     console.log('L',load1);
     
    useEffect(() => {
      if (load1) {
        getData(`http://localhost:5000/load/${load1}`)
        setload1(null)
        setnewcomm(null)
        // setclosestate(false)

      }
    }, [load1,setload1,newcomm,setnewcomm])

    useEffect(() => {
      if (data1) {
        setfreshComments(prevInfinite => [...prevInfinite, ...data1]);    
        // setfreshComments([...data1])


        // setfreshComments(data1)
      }if(error){
        toast({
            variant:"destructive",
            description:"Some Error Occured While fetching Comments !"
        })
      }
    }, [data1,error,setfreshComments])

    useEffect(() => {
      setTimeout(() => {
        const min = 100;
const max = 400;

const randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
setinterval(randomValue)
      }, 800);
      
    
      return () => {
        clearInterval()
      }
    }, [interval])
    
    
    
  return (
    <>  
       {
        loading?(<Skeleton count={10} height={20} width={interval} highlightColor='#fff3cd' inline={false} />):freshComments.length === 0?(<div className='flex justify-center'>No comments</div>)
         :freshComments?.map((comment) =>(
            <DisplayComments key={comment.comment_id} Email={comment.Email} comm={comment.comment_text}/>
         ))
       }
    </>
  )
}

export default Parent;