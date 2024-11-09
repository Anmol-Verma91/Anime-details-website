import { useContext, useEffect, useRef, useState } from "react"
import { IoMdCloseCircle } from "react-icons/io"
import { useNavigate } from "react-router-dom"
import { MainContext } from "../Contexts/mainContext"

function AdvanceSearch({ setOpen, type, className }) {

  const { genre, setGenre, option, setOption, score, setScore, rating, setRating, setIsAdvanceSearch, fetchAdvanceSearchApi, setSearch } = useContext(MainContext)

  const navigate = useNavigate()

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const limit = 35;

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch("https://api.jikan.moe/v4/genres/anime")
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
    fetchGenres()

    setGenre([])
  }, [])

  const advanceSearchsubmit = (e) => {
    e.preventDefault()
    genre.toString()
    setSearch("")
    fetchAdvanceSearchApi(type)
    setIsAdvanceSearch(true)
    setOpen(false)
    navigate(`/search-result/${type}`)

  }
  return (
    <div className={`w-full h-full backdrop-blur-lg absolute top-0 left-0 z-20`}>
      <form onSubmit={advanceSearchsubmit} className={`w-[95%] min-h-[10%] mt-28 m-auto bg-black text-white flex flex-wrap gap-7 sm:gap-10 rounded-xl relative `}>
        <IoMdCloseCircle onClick={() => setOpen(false)} className="absolute top-0 right-2 text-6xl cursor-pointer" />
        <div className="w-[10%] h-full mt-9 ml-4 sm:text-xs">
          <label htmlFor="type" className="text-xl font-semibold"> Type</label><br />
          <select name="type" id="type" value={option} onChange={(e) => setOption(e.target.value)} className="outline-none mt-2 bg-black">
            <option value="all"> All</option>
            <option value="tv"> TV</option>
            <option value="ova"> OVA</option>
            <option value="special"> Special</option>
            <option value="movie"> Movie</option>
            <option value="ona"> ONA</option>
            <option value="music"> Music</option>
          </select>
        </div>
        <div className="w-[14%] h-full mt-9 ml-4 sm:text-xs">
          <label htmlFor="score" className="text-xl font-semibold"> Rating</label><br />
          <select name="score" id="score" value={score} onChange={(e) => setScore(() => e.target.value)} className="outline-none w-full mt-2 bg-black">
            <option value="1"> All</option>
            <option value="9"> 9+</option>
            <option value="8"> 8+</option>
            <option value="7"> 7+</option>
            <option value="6"> 6+</option>
            <option value="5"> 5+</option>
            <option value="4"> 4+</option>
            <option value="3"> 3+</option>
            <option value="2"> 2+</option>

          </select>
        </div>
        <div className="w-[13%] h-full mt-9 ml-4 sm:text-xs">
          <label htmlFor="rating" className="text-xl font-semibold"> Age</label><br />
          <select name="rating" id="rating" value={rating} onChange={(e) => setRating(e.target.value)} className="outline-none mt-2 bg-black">
            <option value="g"> All Ages</option>
            <option value="pg"> Children</option>
            <option value="pg13"> Teens 13 or older</option>
            <option value="r17"> 17+</option>
            <option value="r"> 18+</option>
            <option value="rx"> Hentai</option>
          </select>
        </div>
        <div className="h-[90%] w-[100%] mt-9 ml-4">
          <h1 className="text-xl font-semibold"> Genres</h1>
          <div className="w-full h-[90%] flex flex-wrap md:text-xs">
            {
              loading ?
                <div className="w-8 h-8 border-b-2 border-white rounded-full animate-spin m-auto mt-[15%]"></div> :
                data.message ?
                   <div className="w-20 h-20  m-auto mt-[15%] text-white">Error loading</div>:
                  data.data?.filter((_, index) => index < limit).map((eachItem) => (
                    <div key={eachItem.mal_id} className="w-44 md:w-36 h-8">
                      <input type="checkbox" value={eachItem.mal_id} onChange={(e) => setGenre(prev => [e.target.value, ...prev])} id={eachItem.mal_id} className="mr-2" />
                      <label htmlFor={eachItem.mal_id} >{eachItem.name}</label><br />
                    </div>
                  ))
            }
          </div>
        </div>
        <button className="bg-white text-black text-xl font-semibold h-12 w-44 rounded-xl">Search</button>
      </form>
    </div>
  )
}

export default AdvanceSearch
