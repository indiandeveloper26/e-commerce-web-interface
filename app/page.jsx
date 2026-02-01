
"use client"


import { useRouter } from 'next/navigation'
import LoginPage from './login/page'
import { useEffect, useLayoutEffect } from 'react'


function page() {

  let router = useRouter()

  useEffect(() => {
    router.push("products")
  }, [])








  return (

    <>
    </>
  )
}

export default page