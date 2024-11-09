import { Outlet, useLocation } from "react-router-dom"
import Home from "./pages/Home"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import { MainContext } from "./Contexts/mainContext"
import { useEffect, useState } from "react"

function App() {
   const [myList, setMyList] = useState({data : []})

  const [search, setSearch] = useState("")
  const [isAdvanceSearch, setIsAdvanceSearch] = useState(false)
  const [open, setOpen] = useState(false)

  const [advanceData, setAdvanceData] = useState([])
  const [advanceError, setAdvanceError] = useState(false)
  const [advanceLoading, setAdvanceLoading] = useState(true)

  const [searchData, setSearchData] = useState([])
  const [searchError, setSearchError] = useState(false)
  const [searchLoading, setSearchLoading] = useState(true)

  const [option, setOption] = useState("All")
  const [rating, setRating] = useState("All")
  const [score, setScore] = useState("0")
  const [genre, setGenre] = useState([])

  const {pathname} = useLocation()

  useEffect(()=>{
    window.scrollTo({top:0, behavior: "smooth"})
  },[pathname])


  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));


  const fetchAdvanceSearchApi = async (type) => {
    try {
        const response1 = await fetch(`https://api.jikan.moe/v4/${type}?${score == 0? "" :`min_score=${score}&`}${rating == "All"? "" :`rating=${rating}&`}${genre == []? "" :`genres=${genre}&`}${option == 'All'? "" :`type=${option}`}`)
        const data1 = await response1.json()
        setAdvanceData(data1)
    } catch (error) {
        console.log(error)
        setAdvanceError(true)
    }
    finally {
        setAdvanceLoading(false)
    }
}


  const fetchSearchApi = async (type,search) => {
    try {
        const response2 = await fetch(`https://api.jikan.moe/v4/${type}?q=${search}`)
        const data2 = await response2.json()
        setSearchData(data2)
    } catch (error) {
        console.log(error)
        setSearchError(true)
    }
    finally {
        setSearchLoading(false)
    }
}


useEffect(()=>{
   const localData = JSON.parse(localStorage.getItem("data"))

   if (localData == null) {
    setMyList({data : []})
   }else{
    setMyList({data : localData})
   }
},[])

useEffect(()=>{
    localStorage.setItem("data", JSON.stringify(myList.data))
},[myList])

  return (
   <MainContext.Provider value={{option, setOption, rating, setRating, score, setScore, genre, setGenre, search,setSearch,fetchAdvanceSearchApi, fetchSearchApi, advanceData, searchData, advanceError, searchError, advanceLoading, searchLoading, isAdvanceSearch, setIsAdvanceSearch, open, setOpen, myList, setMyList, delay}}>
   <Navbar/>
   <Outlet/>
   <Footer/>
   </MainContext.Provider>
  )
}

export default App
