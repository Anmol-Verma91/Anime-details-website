import { useContext, useEffect, useState } from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import Reviews from "../components/Reviews";
import ResultBox from "../components/ResultBox";
import { MainContext } from "../Contexts/mainContext";
function Details() {
    const [data1, setData1] = useState([])
    const [data2, setData2] = useState([])
    const [error1, setError1] = useState(false)
    const [error2, setError2] = useState(false)
    const [loading, setLoading] = useState(true)

    const { myList, setMyList } = useContext(MainContext)

    const { id, type } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchDetailsPageApi = async () => {
            try {
                const response1 = await fetch(`https://api.jikan.moe/v4/${type}/${id}/full`)
                const data1 = await response1.json()
                setData1(data1)
            } catch (error) {
                console.log(error)
                setError1(true)
            }

            try {
                const response2 = await fetch(`https://api.jikan.moe/v4/${type}/${id}/recommendations`)
                const data2 = await response2.json()
                setData2(data2)
            } catch (error) {
                console.log(error)
                setError2(true)
            }

            finally {
                setLoading(false)
            }
        }
        fetchDetailsPageApi()
    }, [id, type])

    const addOrRemoveFromList = (eachItem) => {
        const cpyList = [...myList.data]
        const exist = cpyList.findIndex(item => item.mal_id === eachItem.mal_id)

        if (exist == -1) {
            cpyList.push(eachItem)
        } else {
            cpyList.splice(exist)
        }
        setMyList({ data: cpyList })
        
    }
    console.log(myList)

    return (
        <>
            {
                 loading ? <div className="w-8 h-8 border-b-2 border-white rounded-full animate-spin m-auto mt-[15%]"></div> : data1.data.message ?
                 <div className="w-20 h-20  m-auto mt-[15%] text-white">Error loading</div>:
                    data1.data?.length == 0 ? <h1 className="text-2xl text-white text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">No items found</h1> :
                         <header className={`min-h-screen w-full relative`}>
                            <img src={data1.data.images.jpg.image_url} className="w-full h-full object-cover absolute" />
                            <div className="min-h-screen w-full backdrop-blur-2xl flex flex-wrap gap-4 items-center justify-center">

                                <div className="w-[65%] h-3/4 lg:mt-24 lg:w-[90%] flex gap-3 md:flex-col">
                                    <div className="w-40 h-1/2 md:w-40">
                                        <img src={data1.data.images.jpg.image_url} />
                                    </div>
                                    <div className="w-4/5 h-full flex flex-col gap-3 text-white">
                                        <h1 className="text-3xl font-semibold">{data1.data.title}</h1>
                                        <div className="w-full flex gap-4 flex-wrap">
                                            {
                                                type == "anime" && <>
                                                    <p>{data1.data.rating}</p>
                                                    <p> {data1.data.duration}</p>
                                                </>
                                            }
                                            <span className="flex items-center"><FaHeart className="text-xl mr-1" />{data1.data.favorites}</span>
                                            <p>Rank - {data1.data.rank}</p>
                                        </div>
                                        <div className="w-80 h-16 flex gap-3">
                                            {
                                                type == "anime" &&
                                                <button className="p-4 bg-green rounded-full"><Link to={data1.data.streaming[0]?.url}>Watch Now</Link></button>
                                            }
                                            <button className={myList?.data?.findIndex(item => item.mal_id === data1.data.mal_id) == -1 ? "p-4 rounded-full bg-grey" : "p-4 rounded-full bg-red"} onClick={() => addOrRemoveFromList(data1.data)}>{myList?.data?.findIndex(item => item.mal_id === data1.data.mal_id) == -1 ? "Add to list +" : "Remove from List"}</button>
                                        </div>
                                        <p className="overflow-y-scroll scrollbar md:h-72 pr-4">{data1.data.synopsis}</p>
                                    </div>

                                </div>
                                <div className="w-[25%] min-h-[20%]  lg:w-full bg-[#0000004d]">
                                    <p className="ml-4 mt-4 text-white"> <strong>Japanese:</strong> {data1.data.title_japanese}</p>
                                    <div className="ml-4 mt-4 text-white flex items-center"> <FaStar className="text-xl text-yellow" />:{data1.data.score == null ? "?" : data1.data.score}/10</div>
                                    <p className="ml-4 mt-4 text-white"> <strong>Type:</strong> {data1.data.type}</p>
                                    <p className="ml-4 mt-4 text-white"> <strong>Aired:</strong> {type == "anime" ? data1.data.aired.string : data1.data.published.string}</p>
                                    <p className="ml-4 mt-4 text-white"> <strong>Status:</strong> {data1.data.status}</p>
                                    <p className="ml-4 mt-4 text-white"> <strong>{type == "anime" ? "Episodes" : "Chapters"}:</strong> {type == "anime" ? data1.data.episodes : data1.data.chapters}</p>
                                    <div className="ml-4 mt-4 text-white flex flex-wrap items-center gap-2 border-b border-white pb-2">
                                        <strong>Genres:</strong>
                                        {data1.data.genres.map((genre) => (
                                            <span key={genre.mal_id} onClick={() => navigate(`/genres/${type}/${genre.name}/${genre.mal_id}`)} className="border border-white p-1 rounded-xl min-w-0 hover:text-green hover:border-green" >{genre.name}</span>
                                        ))}
                                    </div>
                                    <div className="ml-4 mt-4 text-white flex flex-wrap"> <strong>Producers:</strong>{type == "anime" ? data1.data.producers.map((producer) => (
                                        <span key={producer.mal_id}>{producer.name},</span>
                                    )) :
                                        data1.data.authors.map((author) => (
                                            <span key={author.mal_id}>{author.name},</span>
                                        ))} </div>
                                    {
                                        type == "anime" && <>
                                            <p className="ml-4 mt-4 text-white"> <strong>Licensors:</strong> {data1.data.licensors.map((licensor) => (
                                                <span key={licensor.mal_id}>{licensor.name},</span>
                                            ))}</p>
                                            <p className="ml-4 mt-4 text-white"> <strong>Studios:</strong> {data1.data.studios.map((studio) => (
                                                <span key={studio.mal_id}>{studio.name},</span>
                                            ))}</p>
                                        </>
                                    }
                                </div>
                            </div>
                        </header>

            }
            <Reviews id={id} isAllReviews={false} type={type} />
            <ResultBox name="Recommended For You" data={data2} loading={loading} error={error2} isRecommended={true} type={type} />
        </>

    )
}

export default Details
