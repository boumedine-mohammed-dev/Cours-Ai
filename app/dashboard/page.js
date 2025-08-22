import React from 'react'
import Banner from './_componants/Banner'
import CourseList from './_componants/CourseList'
import EnrollCourse from './_componants/EnrollCourse'
function dashboard() {
    return (
        <div>
            <Banner />
            <EnrollCourse />
            <CourseList />
        </div>
    )
}

export default dashboard
