
"use client"

import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Datadisplay from './child'
import Logo from './logo'
import {io} from 'socket.io-client'
import Skeleton1 from './skeleton'
import Switch1 from './reload'
import { MyContext } from '../loadContext'
import { MyContext1 } from '../infinitteContext'
import { closeit } from '../closecomment'
import Verification from './protected'
import Router, { useRouter } from 'next/navigation'
import useAuth from '../auth'

export default function  Page(){

    const[posts,setposts] = useState([])
    const[error,seterror] = useState(null)
    const [items, setItems] = useState([]);
    const {closestate,setclosestate} = useContext(closeit)
    const router = useRouter()
    const { isAuthenticated, loading1,err } = useAuth();


    // const [loader, setLoader] = useState(false);

    const [loadingmore,setloadingmore] = useState(false)
const [page, setPage] = useState(1); // Track the page or batch of data
const [loading, setLoading] = useState(false);
const [infinite,setinfinite] = useState([])
// const [load,setload] = useState(false)
const {load,setload} = useContext(MyContext)
const [empty,setempty] = useState(false)
const [token, setToken] = useState(null);

// const {load1,setload1} = useContext(MyContext1)
console.log('posts',infinite);



useEffect(() => {
  const savedToken = localStorage.getItem("Token");
  if (savedToken) {
    setToken(savedToken);
  } else {
    router.push('/login');
  }
}, []);

    console.log('posts',posts);
    // const Token = localStorage.getItem("Token")
    // console.log('Token', Token);
    
    useEffect(() => {
      // if(!Token){router.push('/login')}
        const response = axios.get('http://localhost:5000/fetch-posts',{
        headers:{
         authorization:`bearer ${token}`,
        }
        })
        .then((result) =>{
            console.log('result',result.data)

          const decodedImages  =  result?.data?.map(post =>{
         return{
              ID:post.ID,
              Photos:post.Photos,
              Email:post.Email,
              Likes:post.Likes,
              Description:post.Description,
              created_at: post.created_at
         }
              
            })
            setposts(decodedImages)
        })
        .catch((error) =>{
          console.log('error',error);
          
           seterror(error.response)
        })
    
      
}, [])

useEffect(() => {
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
  
  
}, []);
const handleScroll = () => {
  if (window.innerHeight + document.documentElement.scrollTop 
      >= document.documentElement.offsetHeight - 200 && !loading) {
        setloadingmore(true)
    setPage((prevPage) => prevPage + 1); // Increase page count to fetch more data
  }
};
useEffect(() => {
  const socket = io('ws://localhost:5000', {
    extraHeaders: {
        'authorization': `bearer ${token}`
    }
});
  socket.on('connect',()=>{
   socket.on('message',(message) => {
    console.log('message',message);
    setinfinite(prevInfinite => [...prevInfinite, ...message]);    
   })
   
  })

  return () => {
    socket.disconnect(); // Cleanup socket on component unmount
};


}, [page,posts]);



if (load&&page>=100) {
  window.location.reload()

 }
 
//  useEffect(() => {
//   if (infinite.length > 0) {
//     const lastElement = infinite[infinite.length - 1];
//     if (lastElement.ID === load1) {
//       setLoader(true); // Or any logic you want to execute when a match is found
//     }
//   }
// }, [infinite, load1]);
if (loading1) {
  return <h3 className="flex justify-center mt-60">Loading...</h3>
}
if (err || (!isAuthenticated && !loading1)) {
  router.push('/login'); // Redirect to login if there's an error or not authenticated
  return null; // Return null to prevent rendering during redirection
}


  return (
    
      <div>
        <div>
          <Switch1/>
        </div>
            <div className='flex justify-center mt-10'><Logo/></div>

        {posts.map(post=>(
          <Datadisplay key={post.ID} ImageURL={post.Photos} id={post.ID} Like={post.Likes} Des={post.Description}/>
        ))}
        
        {
          !loadingmore?<Skeleton1/>:
          infinite?.map((post)=>(
            <Datadisplay key={post.ID} ImageURL={post.Photos} id={post.ID} Like={post.Likes} Des={post.Description}/>
            
          ),
          
        )
        
       
        }
       
       
      </div>
      
    
  )
}



