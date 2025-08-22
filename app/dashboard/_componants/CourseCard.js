'use client'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { Book, Loader2Icon, PlayCircle, Settings } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { use, useEffect, useState } from 'react'
import { toast } from 'sonner'

function CourseCard({ data, refreshCourses }) {
    const [isLoading, setloading] = useState(false);
    const router = useRouter()
    const onEnrollCourse = async () => {
        setloading(true);
        const result = await axios.post("/api/enroll-course", {
            courseid: data?.cid
        })
        try {
            toast.success("Course  Has Been Generated Successfully.")
            console.log(result.data)
            setloading(false);
            router.push("/dashboard/view-course-content/" + result?.data[0]?.cid)
        }
        catch (e) {
            toast.error("Error Sending Data.")
        }
    }
    return (
        <div className='m-5'>
            <Image src={data?.imageURL} width={400} height={100} alt='image' className='w-full h-[250px] object-cover' />
            <div className='flex flex-col gap-3'>
                <h2 className='font-bold text-blue-500 text-[20px] mt-2' > {data?.courseJson?.course?.name} </h2>
                <p className='line-clamp-3 text-slate-600 ' > {data?.courseJson?.course?.description} </p>
                <div className='flex items-center justify-between'>
                    <h2 className='flex items-center justify-between'><Book /><span className='font-bold' >{data?.courseJson?.course?.chapters} Chapters </span>  </h2>
                    {data?.courseContent?.length == 0 ? <Link href={`/dashboard/edit-course/${data.cid}`} ><Button className='cursor-pointer' ><Settings /> Start Learning</Button></Link> : <Button className='cursor-pointer' onClick={onEnrollCourse} >{isLoading ? <Loader2Icon className="animate-spin" /> : <><PlayCircle />Enroll Course</>}</Button>}
                </div>
            </div>
        </div>
    )
}

export default CourseCard
