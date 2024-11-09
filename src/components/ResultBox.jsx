
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function ResultBox({ name, data, error, loading, isRecommended = false, type }) {

    const navigate = useNavigate()

    return (
        <div className="w-full mt-16 min-h-[500px] relative">
            <h1 className="text-green text-3xl font-semibold ml-10 mt-4">{name}</h1>
            <div className="max-w-[85%] h-full ml-24 sm:ml-1 sm:max-w-[95%] sm:justify-center mt-8 flex flex-wrap gap-8 justify-start">
                {
                    loading ?
                        <div className="w-8 h-8 border-b-2 border-white rounded-full animate-spin m-auto mt-[15%]"></div> :
                        data.message ?
                   <div className="w-20 h-20  m-auto mt-[15%] text-white overflow-hidden">Error loading</div>:

                            data.data?.length == 0 ? <h1 className="text-2xl text-white text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">No items found</h1> :
                                data.data?.map((eachItem) => (
                                    <div key={isRecommended ? eachItem.entry.mal_id : eachItem.mal_id} onClick={() => navigate(`/details/${type}/${isRecommended ? eachItem.entry.mal_id : eachItem.mal_id}`)} className="w-64 h-[350px] md:w-40 md:h-[225px]  relative overflow-hidden border-b-grey border-b-2">
                                        <img src={isRecommended ? eachItem.entry.images.jpg.image_url : eachItem.images.jpg.image_url} className="w-full h-full" />
                                        <div className="bg-black w-full h-16  absolute bottom-0 shadow-[0_-37px_22px_21px_rgba(0,0,0,2.8)]">
                                            <h2 className="text-white text-xl w-[90%] h-1/2 truncate">{isRecommended ? eachItem.entry.title : eachItem.title}</h2>
                                            {
                                                !isRecommended &&
                                                <div className="w-full h-1/2 flex items-center gap-5 md:gap-2">
                                                    <span className="text-grey md:text-xs ">{eachItem.duration}</span>
                                                    <span className="flex">
                                                        <FaStar className="text-yellow text-lg" />
                                                        <p className="text-white">{eachItem.score}/10</p>
                                                    </span>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                ))}


            </div>

        </div>
    )
}

export default ResultBox

