"use client"
import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { UserDetailContext } from '../context/UserContext'
import { useUser } from '@clerk/nextjs'
function Provider({ children }) {
    const { user } = useUser()
    const [Userdetail, setUserdetail] = useState()
    console.log("ddddddddddddddd", user?.fullName)
    console.log("ddddddddddddddd", user?.primaryEmailAddress?.emailAddress)
    const createNewUser = async () => {
        const result = await axios.post("/api/user", {
            name: user?.fullName,
            email: user?.primaryEmailAddress?.emailAddress
        })

        console.log(result.data)
    }

    useEffect(() => {
        user && createNewUser()
    }, [user])
    return (
        <UserDetailContext.Provider value={{ Userdetail, setUserdetail }} >

            {children}

        </UserDetailContext.Provider>
    )
}
export default Provider
