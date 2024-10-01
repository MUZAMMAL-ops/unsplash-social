"use client"
import { createContext, useState } from "react";

export const Commentcontext = createContext(null)


export const Load2 = ({children}) => {
    const [load1,setload1] = useState(null);
    console.log('load1',load1);
    

    return(
        <Commentcontext.Provider value={{load1,setload1}}>
            {children}
        </Commentcontext.Provider>

    )
}

