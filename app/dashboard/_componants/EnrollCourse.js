'use client'
import axios from 'axios'
import { useEffect, useState } from 'react'
import EnrollCourseCard from './EnrollCourseCard'
function EnrollCourse() {
    const [enrollcourse, setenrollcourse] = useState([])
    const getEnrolledCourse = async () => {
        const result = await axios.get("/api/enroll-course")
        setenrollcourse(result.data)
        console.log(result.data)
    }
    useEffect(() => {
        getEnrolledCourse();
    }, [])
    return enrollcourse?.length > 0 && (
        <div>
            <h2 className='p-3 mt-5 font-bold text-[35px] border-b-4 border-blue-400 inline-block text-blue-500'> Countinue Lerning</h2>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 " >
                {enrollcourse.map((e, index) => {
                    return (
                        <EnrollCourseCard key={index} data={e.courses} enroll={e.enrollToCourseTable} />
                    )
                })}
            </div>
        </div>
    )
}

export default EnrollCourse
