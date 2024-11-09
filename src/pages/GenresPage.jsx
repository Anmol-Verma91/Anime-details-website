import { useParams } from "react-router-dom"
import ResultBox from "../components/ResultBox"
import { useEffect, useState } from "react"


function GenresPage() {
    const {id, name, type} = useParams()

    const [data,setData] = useState([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const fetchDetailsPageApi = async () => {
            try {
                const response = await fetch(`https://api.jikan.moe/v4/${type}?genres=${id}`)
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
        fetchDetailsPageApi()
    }, [id, type])
    return (
        <>
         <ResultBox name={name} type={type} data={data} error={error} loading={loading} />
        </>
    )
}

export default GenresPage
