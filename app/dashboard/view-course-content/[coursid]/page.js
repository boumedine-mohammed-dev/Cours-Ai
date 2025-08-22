'use client'
import React from 'react'
import Editcourse from '../../edit-course/[coursid]/page'
import { useParams } from 'next/navigation';
function ViewCourseContent() {
    const { coursid } = useParams();
    console.log(coursid)
    return (
        <div>
            <Editcourse view={true} />
        </div>
    )
}

export default ViewCourseContent
