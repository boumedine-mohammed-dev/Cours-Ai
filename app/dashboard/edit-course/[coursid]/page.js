"use client"
import axios from 'axios';
import CourseInfo from "./_componants/CourseInfo"
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import ChapterList from './_componants/ChapterList'
function Editcourse({ view = false }) {
    const { coursid } = useParams();
    const [loading, setloading] = useState();
    const [data, setdata] = useState([]);
    const getCourseInfo = async () => {
        setloading(true);
        const result = await axios.get("/api/courses?coursid=" + coursid)
        setdata(result.data)
        setloading(false)
    }
    useEffect(() => {
        getCourseInfo();
    }, [])
    return (
        <div>
            <CourseInfo data={data} viewcourse={view} />
            <ChapterList course={data} />
        </div>
    )
}

export default Editcourse