

'use client'

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading1, setLoading1] = useState(true); // Start with loading true
  const [err, setErr] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('Token');
    
    if (!token) {
      setLoading1(false); // Set loading false when there's no token
      router.push('/login'); // Redirect to login if token is missing
    } else {
      axios.post('http://localhost:5000/Token', { Token: token }, { 'content-type': 'application/json' })
        .then((response) => {
          setIsAuthenticated(true); // Token is valid, set authenticated
        })
        .catch((error) => {
          setErr(true); // Authentication failed, set error
          setIsAuthenticated(false);
        })
        .finally(() => {
          setLoading1(false); // Always stop loading after the call finishes
        });
    }
  }, [router]);

  return { isAuthenticated, loading1, err };
};

export default useAuth;

