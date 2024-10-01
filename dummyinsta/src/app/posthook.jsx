
"use client"
// src/hooks/usePost.js

import { useState } from 'react';
import axios from 'axios';

const usePost = () => {
    const [data1, setData1] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const postData = async (url,body,headers) => {
        setLoading(true);
        setError(null);  // Reset error before making a new request
        try {
                const response = await axios.post(url, body,{headers});
                setData1(response.data);
                setLoading(false)
            
           
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { data1, loading, error, postData,setError,setData1 };
};

export default usePost;
