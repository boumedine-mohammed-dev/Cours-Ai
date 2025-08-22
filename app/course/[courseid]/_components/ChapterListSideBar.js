'use client'
import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { SelectChaptersContext } from '@/context/SelectChapters';
import { useContext } from 'react';
function ChapterListSideBar({ data }) {
    console.log(data)
    const { selected, setselected } = useContext(SelectChaptersContext)
    const courses = data?.courses;
    const enrolToCourse = data?.enrolToCourse;
    const courseContent = data?.courses?.courseContent;
    console.log(courses)
    console.log(enrolToCourse)
    console.log(courseContent)
    return (
        <div className='h-screen w-80 bg-slate-100'>
            <h2 className='text-blue-400 m-4 text-xl' >Chapters {courseContent?.length}</h2>

            {courseContent?.map((e, index) => {
                return (<Accordion key={index} type="single" collapsible>

                    <AccordionItem value="item-1" onClick={() => setselected(index)}>
                        <AccordionTrigger className='font-bold p-2 cursor-pointer text-[17px]'>{index + 1}- {e?.courseData?.[0].chapterName} </AccordionTrigger>
                        <AccordionContent>
                            <h2 className='bg-white p-2 my-2'> {e?.courseData?.[0]?.topic} </h2>
                        </AccordionContent>
                    </AccordionItem></Accordion>)
            })}


        </div>
    )
}

export default ChapterListSideBar
