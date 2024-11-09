import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Genres({ data, loading, error, type }) {

    const [limit, setLimit] = useState(15)
    const navigate = useNavigate()

    const loadMore = () => {
        setLimit(prev => prev == data.data?.length ? 15 : prev + data.data?.length - 15)
    }

    return (
        <section className="min-h-[50vh] w-1/2 md:w-full m-auto text-white text-center mt-24">
            <h1 className="text-3xl">Genres</h1>
            {
                loading ?
                    <div className="w-8 h-8 border-b-2 border-white rounded-full animate-spin m-auto mt-[15%]"></div> : data.message ?
                    <div className="w-20 h-20  m-auto mt-[15%] text-white">Error loading</div> :
                        <>  <div className="w-full flex flex-wrap justify-center items-center gap-6 mt-8">
                            {
                                data.data?.filter((eachItem, index) => index < limit).map((eachItem) => (
                                    <span key={eachItem.mal_id} onClick={() => navigate(`/genres/${type}/${eachItem.name}/${eachItem.mal_id}`)} className="bg-orange p-2 rounded-lg cursor-pointer">{eachItem.name}</span>
                                ))}
                        </div>
                            <button onClick={loadMore} className="text-green h-12 w-32 mb-2 border-2 border-green rounded-full  mt-3 hover:bg-green hover:text-white">{limit == data.data?.length ? "See Less" : "See More"}</button>
                        </>

            }
        </section>
    )
}

export default Genres
