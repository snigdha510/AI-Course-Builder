import GalleryCoursCard from '@/components/GalleryCoursCard';
import { prisma } from '@/lib/db'
import React from 'react'

type Props = {}

const GalleryPage = async (props: Props) => {
    const allCourse=await prisma.course.findMany({
        include:{
            units:{
                include:{
                    chapters:true
                }
            }
        }
    });
    
  return (
    <div className='py-8 mx-auto max-w-7xl'>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center'>
            {
                allCourse.map((cours)=>{
                    return(
                        <GalleryCoursCard course={cours} key={cours.id}/>
                    )
                })
            }
        </div>
    </div>
  )
}

export default GalleryPage