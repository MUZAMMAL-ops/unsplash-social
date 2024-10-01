// src/hooks/usePost.js
"use client"
import { useState } from 'react';
import axios from 'axios';

const useGet = () => {
    const [data1, setData1] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getData = async (url) => {
        setLoading(true);
        setError(null);  // Reset error before making a new request
        try {
                const response = await axios.get(url);
                setData1(response.data);
                setLoading(false)
            
           
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return { data1, loading, error, getData,setError,setData1 };
};

export default useGet;
