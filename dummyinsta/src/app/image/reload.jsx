/**
 * v0 by Vercel.
 * @see https://v0.dev/t/RiA5GiAgSRo
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useContext, useState,useEffect } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { MyContext } from "../loadContext"


export default function Switch1({onClick}) {
  const {load,setload} = useContext(MyContext)
  const [autoReload, setAutoReload] = useState(load)

  const ChangeState = () => {
         setload(!load)
         setAutoReload(!autoReload);

  }
//   useEffect(() => {
//     setAutoReload(load);
//   }, [load]);
    return (
    <>
    <div className="flex items-center space-x-2 ">
      <Switch
        // value={load}
        id="auto-reload"
        checked={autoReload}
        // onCheckedChange={setAutoReload}
        onClick={ChangeState}
        className={`relative inline-flex h-[24px] w-[48px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 ${
            load ? "bg-red-700" : "bg-gray-300"
          }`}
      >
        <span className="sr-only">Auto Reload</span>
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-red-700 shadow-lg ring-0 transition duration-200 ease-in-out ${
            autoReload ? "bg-red-700" : "bg-gray-300"
          }`}
        />
      </Switch>
      <Label htmlFor="auto-reload" className="text-base font-medium">
        {autoReload ? "Auto reload" : "Auto reload"}
      </Label>
    </div>
    </>
  )
}