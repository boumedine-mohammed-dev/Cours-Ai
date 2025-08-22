import React from 'react'
import EnrollCourse from '../_componants/EnrollCourse'

function page() {
    return (
        <div className='p-5'>
            <h2 className='font-bold text-[35px] text-blue-500 flex items-center justify-center'> My Coures</h2>
            <EnrollCourse />
        </div>
    )
}

export default page