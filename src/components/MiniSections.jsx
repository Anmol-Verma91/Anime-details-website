import React, { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

function MiniSections({ name, data, loading, error, type}) {

    const navigate = useNavigate()
    
    return (
        <div className='w-1/2 md:w-full h-[80vh]'>
            <h1 className='text-lg text-green font-semibold mb-4'>{name}</h1>
            {
            loading ?
            <div className="w-8 h-8 border-b-2 border-white rounded-full animate-spin m-auto mt-[15%]"></div> : data.message ?
            <div className="w-20 h-20  m-auto mt-[15%] text-white">Error loading</div>:
            data.data?.map((eachItem) => (
                <div key={eachItem.mal_id} onClick={()=> navigate(`/details/${type}/${eachItem.mal_id}`)} className='w-[90%] h-[25%] ml-6 flex justify-between gap-4 items-center border-b border-grey'>
                    <div className='h-24 w-16 overflow-hidden rounded-lg'>
                        <img src={eachItem.images.jpg.image_url} className='h-full w-full' />
                    </div>
                    <div className='w-[78%] h-1/2'>
                        <h2 className='text-white text-lg sm:text-sm font-semibold'>{eachItem.title}</h2>
                        <div className='h-1/2 w-3/4 flex items-center gap-4'>
                            <span className='flex items-center'>
                                <FaStar className='text-yellow text-2xl' />
                                <p className='text-white'>{eachItem.score == null ? "?" : eachItem.score}/10</p>
                            </span>
                            <p className='text-grey'>{eachItem.type}</p>
                        </div>

                    </div>
                </div>
            ))}
        </div>
    )
}

export default MiniSections
