import { Book, PlayIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Progress } from "@/components/ui/progress"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
function EnrollCourseCard({ data, enroll }) {
    const calculateProgress = () => {
        const total = data?.courseContent?.length || 0
        const done = enroll?.coursesDone?.length || 0
        if (total == 0) {
            return 0
        }
        return Math.round((done / total) * 100)
    }
    return (
        <div className='m-5'>
            <Image src={data?.imageURL} width={400} height={100} alt='image' className='w-full h-[250px] object-cover' />
            <div className='flex flex-col gap-3'>
                <h2 className='font-bold text-blue-500 text-[20px] mt-2' > {data?.courseJson?.course?.name} </h2>
                <p className='line-clamp-3 text-slate-600 ' > {data?.courseJson?.course?.description} </p>
                <div  >
                    <h2 className='flex justify-between mb-2 text-blue-400 font-bold'>
                        Progress<span>{calculateProgress()}%</span>
                    </h2>
                    <Progress value={calculateProgress()} />
                    <Link href={`/dashboard/view-course-content/${data.cid}`}>
                        <Button className='mt-5 w-full cursor-pointer'> <PlayIcon /> Countinue Lerning</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default EnrollCourseCard
