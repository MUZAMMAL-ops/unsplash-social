
"use client"
// src/hooks/usePost.js

import { useState } from 'react';
import axios from 'axios';

const usePatch = () => {
    const [data2, setData2] = useState(null);
    const [loading1, setLoading1] = useState(false);
    const [error1, setError1] = useState(null);

    const postData1 = async (url,body,headers) => {
        setLoading1(true);
        setError1(null);  // Reset error before making a new request
        try {
                const response = await axios.patch(url, body,{headers});
                setData2(response.data);
                setLoading1(false)
            
           
        } catch (err) {
            setError1(err);
        } finally {
            setLoading1(false);
        }
    };

    return { data2, loading1, error1, postData1,setError1,setData2 };
};

export default usePatch;
