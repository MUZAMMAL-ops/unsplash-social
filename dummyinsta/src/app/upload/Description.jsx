"use client"
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/wSRfjjTQ2OX
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export default function Description1() {
  return (
    <div className="grid w-full  items-center gap-1.5" >
      <Label htmlFor="name">Description</Label>
      <Input type="text"  id="name" placeholder="Describe your pic..."  />
    </div>
  )
}