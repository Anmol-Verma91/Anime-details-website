import React, { useContext } from 'react'
import ResultBox from '../components/ResultBox'
import { MainContext } from '../Contexts/mainContext'

function MyList() {
    const {myList} = useContext(MainContext)
    
    return (
        <>
        <ResultBox data={myList} type="anime" name="My List" />
        </>
    )
}

export default MyList

