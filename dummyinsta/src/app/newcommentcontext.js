"use client"
import { createContext, useState } from "react";

export const NewComment = createContext(null)


export const NewComment1 = ({children}) => {
    const [newcomm,setnewcomm] = useState(null);

    return(
        <NewComment.Provider value={{newcomm,setnewcomm}}>
            {children}
        </NewComment.Provider>

    )
}

