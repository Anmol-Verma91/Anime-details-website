
import Search from '../components/Search'
import MiniSections from '../components/MiniSections'
import Genres from '../components/Genres'
import Slider from '../components/Slider'
import AdvanceSearch from '../components/AdvanceSearch'
import { useContext, useEffect, useState } from 'react'
import { MainContext } from '../Contexts/mainContext'
import ResultBox from '../components/ResultBox'
function Anime() {

    const { open, setOpen, delay} = useContext(MainContext)

    const [data1, setData1] = useState([])
    const [data2, setData2] = useState([])
    const [data3, setData3] = useState([])
    const [data4, setData4] = useState([])

    const [error1, setError1] = useState(false)
    const [error2, setError2] = useState(false)
    const [error3, setError3] = useState(false)
    const [error4, setError4] = useState(false)

    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const fetchAnimePageApi = async () => {
            try {
                const response1 = await fetch("https://api.jikan.moe/v4/top/anime?filter=bypopularity&limit=10")
                const data1 = await response1.json()
                setData1(data1)
            } catch (error) {
                console.log(error)
                setError1(true)
            }

            try {
                const response2 = await fetch("https://api.jikan.moe/v4/top/anime?filter=airing&limit=4")
                const data2 = await response2.json()
                setData2(data2)
            } catch (error) {
                console.log(error)
                setError2(true)
            }
            await delay(2000)

            try {
                const response3 = await fetch("https://api.jikan.moe/v4/top/anime?filter=upcoming&limit=4")
                const data3 = await response3.json()
                setData3(data3)
            } catch (error) {
                console.log(error)
                setError3(true)
            }

            try {
                const response4 = await fetch("https://api.jikan.moe/v4/genres/anime")
                const data4 = await response4.json()
                setData4(data4)
            } catch (error) {
                console.log(error)
                setError4(true)
            }
            finally {
                setLoading(false)
            }
        }
        fetchAnimePageApi()
    }, [])

    return (
        <div className='h-full w-full relative'>
            <Search name="Search Anime" setOpen={setOpen} type="anime" />
            <Slider data={data1} error={error1} loading={loading} type="anime" />
            <section className='w-[90%] min-h-screen flex ml-10 mt-10 md:flex-col gap-20'>
                <MiniSections name="Top Airing" data={data2} error={error2} loading={loading} type="anime" />
                <MiniSections name="Top Upcoming" data={data3} error={error3} loading={loading} type="anime" />
            </section>
            <Genres data={data4} error={error4} loading={loading} type="anime" />
        {  
           open &&
            <AdvanceSearch setOpen={setOpen} type="anime" />
        }
        </div>
    )
}

export default Anime