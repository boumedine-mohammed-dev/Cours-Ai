'use client'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { Book, Clock, Loader2Icon, TrendingUp } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from "sonner"
import Link from 'next/link'
function CourseInfo({ data, viewcourse }) {
    console.log("============", data)
    const router = useRouter();
    const [isLoading, setisLoading] = useState(false);
    const layout = data?.courseJson?.course
    const getCoureseContent = async () => {
        setisLoading(true)
        try {
            const result = await axios.post("/api/GenerateCourseContent", {
                courseJson: layout,
                name: data.name,
                courseid: data.cid
            })
            console.log(result.data)
            toast.success("Course  Has Been Generated Successfully.")
            router.push("/dashboard")
        }
        catch (error) {
            console.log(error)
            toast.error("Error Sending Data.")

        }
        setisLoading(false)

    }
    return (
        <div className='p-7 mt-5 shadow-md' >
            <div className='md:flex gap-5 justify-between block ' >
                <div className='flex flex-col' >
                    <h1 className='font-bold text-blue-500 text-[35px] mb-2' >{data?.courseJson?.course?.name}</h1>
                    <p className='text-slate-500' >{data?.courseJson?.course?.description}</p>
                    {viewcourse ? <Link href={"/course/" + data.cid}> <Button className='w-fit mt-10' > {isLoading ? <Loader2Icon className="animate-spin" /> : <span>Countnue Learning</span>}</Button> </Link> : <Button onClick={getCoureseContent} className='w-fit mt-10' > {isLoading ? <Loader2Icon className="animate-spin" /> : <span>Generate Course</span>}</Button>}
                </div>

                <Image src={data?.imageURL || "/public/logo.png"} width={400} height={400} alt='image' className='mt-10 w-full h-[250px] object-cover rounded-2xl' />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-5 p-3' >
                <div className='flex gap-3 items-center mt-5 shadow-md rounded-lg p-3' >
                    <Clock className='text-blue-500' />
                    <section>
                        <h2 className='font-bold' >Duration</h2>
                        <h2>2 Hours</h2>
                    </section>

                </div>
                <div className='flex gap-3 items-center mt-5 shadow-md rounded-lg p-3' >
                    <Book className='text-blue-500' />
                    <section>
                        <h2 className='font-bold'>Chapters</h2>
                        <h2>{data?.courseJson?.course?.chapters}</h2>
                    </section>
                </div>
                <div className='flex gap-3 items-center mt-5 shadow-md rounded-lg p-3' >
                    <TrendingUp className='text-blue-500' />
                    <section>
                        <h2 className='font-bold' >Difficulty</h2>
                        <h2>{data?.courseJson?.course?.level}</h2>
                    </section>
                </div>
            </div>

        </div>
    )
}
export default CourseInfo
