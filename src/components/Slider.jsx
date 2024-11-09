import React, { useEffect, useState } from 'react'
import { FaCalendarAlt, FaStar } from 'react-icons/fa'
import { RiArrowRightCircleFill } from 'react-icons/ri'
import { MdArrowCircleLeft } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
function Slider({ data, loading, error, type }) {

    const [slider, setSlider] = useState(0)
    const [isActive, setIsActive] = useState(false);

    const navigate = useNavigate()

    useEffect(()=>{
        let changeSlide
     if(!isActive){
       changeSlide = setInterval(()=>setSlider(prev => prev >= 700 ? 0 : prev + 100), 4000);
     }
     return ()=>{
        if (changeSlide) {
            clearInterval(changeSlide)
        }
     }
    },[isActive])
   

    const nextSlide = () => {
        setSlider(prev => prev >= 700 ? 0 : prev + 100)
        setIsActive(true)
    }

    const prevSlide = () => {
        setSlider(prev => prev <= 0 ? 700 : prev - 100)
        setIsActive(true)

    }
    return (
        <section className={`h-[80vh] w-[90%] m-auto border-2 border-grey rounded-xl mt-4 relative overflow-hidden z-10`}>
            {
                loading ?
                    <div className="w-8 h-8 border-b-2 border-white rounded-full animate-spin m-auto mt-[15%]"></div> : data.message ?
                    <div className="w-20 h-20  m-auto mt-[15%] text-white">Error loading</div> :
                        data.data?.map((eachItem, index) => (
                            <div key={eachItem.mal_id}
                                style={{
                                    transform: `translateX(-${slider}%)`,
                                    left: `${index * 100}%`
                                }}
                                onClick={() => navigate(`/details/${type}/${eachItem.mal_id}`)} className={`w-full h-full absolute flex justify-end overflow-hidden transition-all`}>
                                <div className='w-[30%] h-full md:hidden bg-black shadow-[145px_5px_65px_62px_rgba(0,0,0,1.99)] top-0 left-0 absolute z-10 '></div>
                                <div className='w-1/2 h-[70%] flex items-end justify-between gap-2 absolute left-6 bottom-7 z-20'>
                                    <img src={eachItem.images.jpg.image_url} className='w-[240px] h-[350px] md:hidden' />
                                    <div className='w-[60%] h-[full] md:w-full'>
                                        <h1 className='text-white text-6xl font-bold md:text-4xl'>{eachItem.title}</h1>
                                        <ul className='flex flex-wrap gap-2 text-white mb-4 mt-3 md:w-[300px]'>
                                            {
                                                eachItem.genres.map((genres) => (
                                                    <li key={genres.mal_id} className='bg-orange p-1 rounded-lg'>{genres.name}</li>
                                                ))
                                            }
                                        </ul>
                                        <div className='text-grey flex gap-2 items-center'>
                                            <FaCalendarAlt className=' text-3xl sm:text-[100px]' />
                                            <p className='text-xl'>{type == "anime" ? eachItem.aired.string : eachItem.published.string}</p>
                                            <FaStar className="text-yellow text-3xl sm:text-[100px]" />
                                            <p className='text-white text-xl'>{eachItem.score}/10</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-[70%] md:w-full h-full overflow-hidden'>
                                    <img src={type == "anime" ? eachItem.trailer.images.maximum_image_url : eachItem.images.jpg.image_url} className='w-full h-full object-cover' />
                                </div>
                            </div>
                        ))}
                        
                    <RiArrowRightCircleFill onClick={nextSlide} className="text-grey absolute text-6xl  top-[50%] -right-5 hover:text-green" />
                    <MdArrowCircleLeft onClick={prevSlide} className="text-grey absolute text-6xl top-[50%] -left-5 hover:text-green" />
            

        </section>

    )
}

export default Slider
