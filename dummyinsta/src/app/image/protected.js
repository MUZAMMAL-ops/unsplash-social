"use client"

const { useRouter } = require("next/navigation");

export default function Verification(route){
const Token = localStorage.getItem("token");
const router = useRouter()
if (!Token) {
    router.push(route)
}
}