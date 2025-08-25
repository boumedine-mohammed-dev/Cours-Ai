"use client"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useEffect, useState } from "react"
import CourseFormDialog from "./CourseFormDialog"
import axios from "axios"
import { useUser } from "@clerk/nextjs"
import CourseCard from './CourseCard'

function CourseList() {
    const [courseList, setcourseList] = useState([])
    const { user } = useUser();
    const getcourselist = async () => {
        const result = await axios.get("/api/courses")
        setcourseList(result.data)
    }
    useEffect(() => {
        user && getcourselist();
    }, [user])
    return (
        <div>
            <h2 className='p-3 mt-5 font-bold text-[35px] border-b-4 border-blue-400 inline-block text-blue-500'> Course List</h2>
            {courseList?.length == 0 ?
                <div className="flex flex-col items-center" >
                    <Image src='/logo.png' width={100} height={100} alt="logo" />
                    <h1 className="font-bold text-[20px]" >No Courese Created..</h1>
                    <div className="mt-10" > <CourseFormDialog /></div>
                </div> :
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 ">
                    {courseList.map((e, index) => {
                        return (
                            <CourseCard key={index} data={e} />
                        )
                    })}
                </div>}
        </div>
    )
}
export default CourseList
