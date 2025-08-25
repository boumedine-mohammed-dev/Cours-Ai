'use client'
import Header from '@/app/dashboard/_componants/Header'
import { useEffect, useState } from 'react'
import ChapterListSideBar from './_components/ChapterListSideBar'
import ChapterContent from './_components/ChapterContent'
import axios from 'axios'
import { useParams } from 'next/navigation'
function Course() {
    const [data, setdata] = useState([])
    const { courseid } = useParams();
    const getEnrolledCourse = async () => {
        const result = await axios.get("/api/enroll-course?courseid=" + courseid)
        setdata(result.data)
    }
    useEffect(() => {
        getEnrolledCourse();
    }, [])
    return (
        <div>
            <Header hideSideBar={true} />
            <div className='flex flex-col md:flex-row gap-15'>
                <ChapterListSideBar data={data} />
                <ChapterContent data={data} />
            </div>
        </div>
    )
}

export default Course
