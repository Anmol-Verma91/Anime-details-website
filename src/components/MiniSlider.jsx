import { useEffect, useRef, useState } from "react"
import { RiArrowRightCircleFill } from "react-icons/ri";
import { MdArrowCircleLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";
function MiniSlider({name, data, loading, error, type}) {
    
    const navigate = useNavigate()
    const slider = useRef()

    const prevSlide = ()=>{
       slider.current.scrollLeft += 1000;
    }
    const nextSlide = ()=>{
       slider.current.scrollLeft -= 1000;
    }

    

    return (
        <div className="w-full h-96 mt-16 relative">
            <h1 className="text-green text-3xl font-semibold ml-10 mt-4">{name}</h1>
            <div ref={slider} className="h-[80%] w-[85%] md:w-[60%] sm:min-w-[90%] sm:ml-5 ml-28 mt-8 flex flex-col flex-wrap overflow-auto items-center gap-16 scroll-smooth no-scrollbar">
                {
                loading ?
                <div className="w-8 h-8 border-b-2 border-white rounded-full animate-spin"></div> : data.message ?
                <div className="w-20 h-20  m-auto mt-[15%] text-white">Error loading</div> :
                data.data?.map((eachItem) => (
                    <div key={eachItem.mal_id} onClick={()=> navigate(`/details/${type}/${eachItem.mal_id}`)} className="w-56 h-full relative flex justify-end">
                        <h2 className=" h-15 w-full truncate rotate-[270deg] text-white text-2xl absolute bottom-32 -left-[44%]">{eachItem.title}</h2>
                        <div className="h-full w-[87%] bg-orange">
                            <img src={eachItem.images.jpg.image_url} className="h-full w-full object-cover" />
                        </div>
                    </div>
                ))}
            </div>
            <RiArrowRightCircleFill onClick={prevSlide} className="text-grey absolute text-6xl top-[50%] right-3 hover:text-green sm:hidden" />
            <MdArrowCircleLeft onClick={nextSlide} className="text-grey absolute top-[50%] left-10 text-6xl hover:text-green sm:hidden" />
        </div>
    )
}

export default MiniSlider
