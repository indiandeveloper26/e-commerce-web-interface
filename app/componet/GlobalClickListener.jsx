"use client";

import { useEffect } from "react";
import { toast } from "react-toastify";

export default function GlobalClickListener() {

  useEffect(() => {

    const handleClick = (event) => {
      const element = event.target;

      console.log("Clicked:", element);

      // yaha apna function call karo
      myGlobalFunction(element);
    };


    document.addEventListener("click", handleClick);


    return () => {
      document.removeEventListener("click", handleClick);
    };

  }, []);


  return null;
}


function myGlobalFunction(element) {
  console.log("Global function called");
   toast.success("Button click hua ✅");

  // example
  // toast.success("Button click hua");
}