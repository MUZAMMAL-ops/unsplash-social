"use client"

import { Children, createContext, useState } from "react";

export const closeit = createContext(false);

export const Closingit = ({children}) => {
    const [closestate,setclosestate] = useState(true)

    return (
        <closeit.Provider value={{closestate,setclosestate}}>
            {children}
        </closeit.Provider>
    )
}