"use client"
import { createContext, useState } from "react";

export const MyContext1 = createContext('')


export const Load1 = ({children}) => {
    const [load1,setload1] = useState('');
    console.log('load1',load1);
    

    return(
        <MyContext1.Provider value={{load1,setload1}}>
            {children}
        </MyContext1.Provider>

    )
}

