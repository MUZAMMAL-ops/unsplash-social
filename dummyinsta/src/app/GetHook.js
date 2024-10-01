
"use client"
// src/hooks/usePost.js

import { useState } from 'react';
import axios from 'axios';

const usePost5 = () => {
    const [data5, setData5] = useState(null);
    const [loading5, setLoading5] = useState(false);
    const [error5, setError5] = useState(null);

    const postData5 = async (url,body,headers) => {
        setLoading5(true);
        setError5(null);  // Reset error before making a new request
        try {
                const response = await axios.post(url, body,{headers});
                setData5(response.data);
                setLoading5(false)
            
           
        } catch (err) {
            setError5(err);
        } finally {
            setLoading5(false);
        }
    };

    return { data5, loading5, error5, postData5,setError5,setData5 };
};

export default usePost5;
