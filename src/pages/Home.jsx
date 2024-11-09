
import { IoIosPlayCircle } from "react-icons/io";
import { GoClockFill } from "react-icons/go";
import { FaCalendarAlt } from "react-icons/fa";
import { RiArrowRightCircleFill } from "react-icons/ri";
import { MdArrowCircleLeft } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import MiniSlider from "../components/MiniSlider";
import ResultBox from "../components/ResultBox";
import Reviews from "../components/Reviews";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../Contexts/mainContext";


function Home() {
    const [data1, setData1] = useState([])
    const [data2, setData2] = useState([])
    const [data3, setData3] = useState([])
    const [data4, setData4] = useState([])
    const [data5, setData5] = useState([])
    const [data6, setData6] = useState([])
    const [error1, setError1] = useState(false)
    const [error2, setError2] = useState(false)
    const [error3, setError3] = useState(false)
    const [error4, setError4] = useState(false)
    const [error5, setError5] = useState(false)
    const [error6, setError6] = useState(false)
    const [loading, setLoading] = useState(true)

    const [currentSlide, setCurrentSlide] = useState(0)
    const navigate = useNavigate()

    const {delay} = useContext(MainContext)

    useEffect(() => {
        const fetchHomePageApi = async () => {
            try {
                const response1 = await fetch("https://api.jikan.moe/v4/top/anime?limit=10")
                const data1 = await response1.json()
                setData1(data1)
            } catch (error) {
                console.log(error)
                setError1(true)
            }

            try {
                const response2 = await fetch("https://api.jikan.moe/v4/top/anime?filter=favorite&limit=10")
                const data2 = await response2.json()
                setData2(data2)
            } catch (error) {
                console.log(error)
                setError2(true)
            }

            await delay(2000)
            try {
                const response3 = await fetch("https://api.jikan.moe/v4/top/manga?filter=favorite&limit=10")
                const data3 = await response3.json()
                setData3(data3)
            } catch (error) {
                console.log(error)
                setError3(true)
            }

            try {
                const response4 = await fetch("https://api.jikan.moe/v4/top/anime?type=movie&limit=12")
                const data4 = await response4.json()
                setData4(data4)
            } catch (error) {
                console.log(error)
                setError4(true)
            }
           
            try {
                const response5 = await fetch("https://api.jikan.moe/v4/top/anime?type=special&limit=12")
                const data5 = await response5.json()
                setData5(data5)
            } catch (error) {
                console.log(error)
                setError5(true)
            }
            await delay(2000)
            try {
                const response6 = await fetch("https://api.jikan.moe/v4/top/manga?type=novel&limit=12")
                const data6 = await response6.json()
                setData6(data6)

            } catch (error) {
                console.log(error)
                setError6(true)
            }

            finally {
                setLoading(false)
            }
        }
        fetchHomePageApi()
    }, [])

    const nextSlide = () => {
        setCurrentSlide(curr => curr === data1.data.length - 1 ? 0 : curr + 1)
    }

    const prevSlide = () => {
        setCurrentSlide(curr => curr === 0 ? data1.data.length - 1 : curr - 1)
    }

    return (
        <>
            <header className="h-screen w-full flex justify-center items-center">
                {
                   loading ? <div className="w-8 h-8 border-b-2 border-white rounded-full animate-spin"></div> :

                   data1.message ?
                   <div className="w-20 h-20  m-auto mt-[35%] text-white">Error loading</div> :
                
                
                   data1?.data?.map((eachItem, index) =>
                    currentSlide == index && (
                        <div key={eachItem.mal_id} className="w-full h-full flex justify-end sm:justify-start items-center relative overflow-hidden">
                            <div className="w-1/2 flex flex-col gap-5 absolute left-12 top-[40%] z-10">
                                <h4 className="text-green">#{eachItem.rank} Spotlight</h4>
                                <h1 className="text-4xl text-white font-medium">{eachItem.title_english}</h1>

                                <div className="flex items-center gap-4 sm:hidden">
                                    <span className="text-white flex items-center gap-1"><IoIosPlayCircle className="text-xl"/>{eachItem.type}</span>
                                    <span className="text-white flex items-center gap-1"><GoClockFill className="text-xl" />{eachItem.duration}</span>
                                    <span className="text-white flex items-center gap-1"><FaCalendarAlt className="text-xl" />{eachItem.aired.string}</span>
                                </div>
                                <button onClick={() => navigate(`/details/anime/${eachItem.mal_id}`)} className="p-4 bg-green rounded-full w-1/4 md:w-[60%] sm:text-sm">View Details</button>
                            </div>
                            <div className="w-[70%] sm:w-full h-full">
                                <img src={eachItem.images.jpg.large_image_url} className="h-full w-full object-cover " />
                            </div>
                            <div className="w-[73%] sm:w-full h-full shadow-[inset_70px_0px_101px_114px_rgba(0,0,0,2.1)] absolute">
                            </div>
                        </div>
                    ))}
            </header>
            <RiArrowRightCircleFill onClick={nextSlide} className="text-grey absolute text-6xl bottom-20 right-6 hover:text-green" />
            <MdArrowCircleLeft onClick={prevSlide} className="text-grey absolute text-6xl bottom-5 right-6 hover:text-green" />
            <MiniSlider name="Most Favourite Anime" data = {data2} error = {error2} loading={loading} type="anime" />
            <MiniSlider name="Most Favourite Manga" data = {data3} error = {error3} loading={loading} type="manga" />

            <ResultBox name="Top Movies" data = {data4} error = {error4} loading={loading} type="anime"/>
            <Reviews isAllReviews={true} />
            <ResultBox name="Specials" data = {data5} error = {error5} loading={loading} type="anime" />
            <ResultBox name="Novels" data = {data6} error = {error6} loading={loading} type="manga" />
        </>
    )
}

export default Home