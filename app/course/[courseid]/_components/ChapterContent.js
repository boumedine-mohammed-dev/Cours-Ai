'use client'
import { useContext } from 'react'
import { SelectChaptersContext } from '@/context/SelectChapters';
import YouTube from 'react-youtube'
function ChapterContent({ data }) {
    console.log(data)
    const courses = data?.courses;
    const enrolTocourse = data?.enrollToCourseTable;
    const courseContent = data?.courses?.courseContent
    const { selected, setselected } = useContext(SelectChaptersContext)
    const youtubeVideo = courseContent?.[selected]?.youtubeVideo
    const topic = courseContent?.[selected]?.courseData?.[0]?.topic;
    const content = courseContent?.[selected]?.courseData?.[0]?.content;

    return (
        <div className='p-8'>
            <h2 className='font-bold text-[20px ] text-blue-500'>{courseContent?.[selected]?.courseData?.[0]?.chapterName}</h2>
            <div className='grid grid-cols-1 gap-5  md:grid-cols-2 mt-7'>
                {youtubeVideo?.map((e, index) => {
                    return (
                        <div key={index}>
                            <YouTube
                                videoId={e?.videoId}
                                opts={{
                                    height: "200",
                                    width: "310"
                                }} />
                        </div>
                    )
                })}
            </div>
            <div className='mt-5 '>
                {topic && (<h2 className='font-semibold text-lg'>{topic}</h2>)}
            </div>
            <div className='mt-5  bg-slate-100 p-4'>
                {content && (<div style={{ lineHeight: '30px ' }} dangerouslySetInnerHTML={{ __html: content }}></div>)}
            </div>

        </div>
    )
}

export default ChapterContent
