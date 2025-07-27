import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Chapter, Course, Unit } from 'prisma/prisma-client'
import React from 'react'
import { Separator } from './ui/separator'

type Props = {
    course:Course & {
        units:(Unit & {
            chapters:Chapter[]
        })[]
    };
    currentChapterId:string
}

async function CourseSideBare({course,currentChapterId}: Props) {
  return (
    <div className='max-sm:hidden w-[400px] absolute top-1/2 -translate-y-1/2 p-6 rounded-r-3xl bg-indigo-300 dark:bg-secondary '>
        <h1 className='text-4xl font-bold'>
            {course.name}
        </h1>
        {
            course.units.map((unit,unitIndex)=>{
                return(
                    <div key={unit.id} className='mt-4'>
                        <h2 className='text-sm uppercase text-secondary-foreground/60'>Unit {unitIndex+1}</h2>
                        <h2 className='text-2xl font-bold'>
                            {unit.name}
                        </h2>
                        {unit.chapters.map((chapter,chapterIndex)=>{
                            return (
                                <div key={chapter.id}>
                                    <Link href={`/course/${course.id}/${unitIndex}/${chapterIndex}`} className={cn('text-secondary-foreground/60 hover:text-indigo-700',{
                                        'text-indigo-700 font-bold':chapter.id==currentChapterId
                                    })}>
                                        {chapter.name}
                                    </Link>
                                </div>
                            )
                        })}
                        <Separator className='mt-2 text-gray-500 bg-gray-500'/>
                    </div>
                )
            })
        }
    </div>
  )
}

export default CourseSideBare