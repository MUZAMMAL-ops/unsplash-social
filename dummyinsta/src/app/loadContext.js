"use client"
import { createContext, useState } from "react";

export const MyContext = createContext(null)


export const Load = ({children}) => {
    const [load,setload] = useState(true);

    return(
        <MyContext.Provider value={{load,setload}}>
            {children}
        </MyContext.Provider>

    )
}

