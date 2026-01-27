
"use client"


import { useRouter } from 'next/navigation'
import LoginPage from './login/page'
import { useEffect, useLayoutEffect } from 'react'


function page() {

  let router = useRouter()









  return (
    router.push("products")

  )
}

export default page