"use client"

import React from 'react'
import { useDispatch, useSelector } from 'react-redux';


function page() {



    const { isLoggedIn, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    console.log('data', isLoggedIn, user)



    return (
        <div>
            <button >
                update data
            </button>
        </div>
    )
}


export default page