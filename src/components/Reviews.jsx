import { useEffect, useState } from "react"
import { Link, useHref, useNavigate } from "react-router-dom"

function Reviews({ id, isAllReviews, type }) {
    const [data, setData] = useState([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [mangaReview, setMangaReview] = useState(false)
    const [limit, setLimit] = useState(5)

    const navigate = useNavigate()

    const LatestReviews = `https://api.jikan.moe/v4/reviews/${mangaReview ? "manga" : "anime"}`
    const EachReview = `https://api.jikan.moe/v4/${type}/${id}/reviews`
    const fetchReviews = async () => {
        try {
            setLoading(true)
            const response = await fetch(`${isAllReviews ? LatestReviews : EachReview}`)
            const data = await response.json()
            setData(data)
        } catch (error) {
            console.log(error)
            setError(true)
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setTimeout(() => {
            fetchReviews()
        }, 100)
    }, [mangaReview])

    const onAnimeClick = () => {
        setMangaReview(false)
        setLimit(3)
    }

    const onMangaClick = () => {
        setMangaReview(true)
        setLimit(3)
    }

    const loadMore = () => {
        setLimit(prev => prev >= data.data?.length ? 5 : prev + 5)
    }


    return (
        <div className="w-full min-h-96 mt-16 relative bg-[#343a40]">
            <h2 className="text-green text-3xl font-semibold ml-10 pt-10">{isAllReviews && "Recent"} Reviews</h2>
            {
                isAllReviews && <ul className="flex text-lg text-white mt-6 gap-7 ml-10">
                    <li className={`${mangaReview == false ? "text-green border-2 p-4 border-green rounded-full  cursor-pointer" : "cursor-pointer border-b-green"}`} onClick={onAnimeClick}>Anime</li>
                    <li className={`${mangaReview ? "text-green border-2 p-4 border-green rounded-full cursor-pointer" : "cursor-pointer border-b-green"}`} onClick={onMangaClick}>Manga</li>
                </ul>
            }

            { loading ? <div className="w-8 h-8 border-b-2 border-white rounded-full animate-spin m-auto mt-[15%]"></div> : data.message ?
                   <div className="w-20 h-20  m-auto mt-[15%] text-white">Error loading</div>:
                data.data?.length == 0 ?
                    <h1 className="text-2xl text-white text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">No reviews found</h1> :
                    data.data?.filter((_, index) => index < limit).map((eachItem) => (
                        <div key={eachItem.mal_id} className="h-64 w-3/4 md:h-72 bg-grey rounded-xl m-auto mt-10 p-4 relative overflow-hidden">
                            {isAllReviews &&
                                <span className="absolute top-3 left-48 hidden md:block w-[50%] h-5 truncate sm:left-36 ">{eachItem.entry.title}</span>}
                            <div className="h-16 w-[300px] text-green text-xl flex gap-4 items-center">
                                <div className="h-[56px] w-[56px] rounded-[50%] overflow-hidden">
                                    <Link to={eachItem.user.url}><img src={eachItem.user.images.jpg.image_url} className="h-full w-full" /></Link>
                                </div>
                                <Link to={eachItem.user.url}><h3>{eachItem.user.username}</h3></Link>

                            </div>
                            <p className={`h-[70%] pr-2 ${isAllReviews ? "w-[75%] md:w-full" : "w-full"} text-white text-sm  overflow-y-scroll scrollbar`}>
                                {eachItem.review}
                            </p>
                            {
                                isAllReviews && <div onClick={() => navigate(`/details/${eachItem.type}/${eachItem.entry.mal_id}`)} className="h-[90%] w-[140px] absolute right-4 top-3 rounded-xl overflow-hidden md:hidden">
                                    <img src={eachItem.entry.images.jpg.image_url} className="w-full h-full" />
                                    <div className="bg-black w-full h-14 pl-2 absolute bottom-0 shadow-[0_-6px_22px_21px_rgba(0,0,0,2.8)]">
                                        <h2 className="text-white text-xs w-[90%] h-[90%] overflow-hidden">{eachItem.entry.title}</h2>
                                    </div>
                                </div>
                            }

                        </div>
                    ))}
            {
                data.data?.length > 0 &&
                <button onClick={loadMore} className="text-green h-12 w-32 mb-2 border-2 border-green rounded-full ml-[42%] mt-3 hover:bg-green hover:text-white">{limit >= data.data?.length ? "Show Less" : "load More"}</button>
            }

        </div>
    )
}

export default Reviews
