import React, { useContext, useEffect } from 'react'
import { MainContext } from '../Contexts/mainContext'
import { useParams } from 'react-router-dom'
import ResultBox from '../components/ResultBox'
import Search from '../components/Search'
import AdvanceSearch from '../components/AdvanceSearch'

function SearchResult() {

    const { advanceData, searchData, isAdvanceSearch,setIsAdvanceSearch,fetchSearchApi, setOpen, open, advanceLoading, searchLoading, setSearch } = useContext(MainContext)
    const { type } = useParams()

    useEffect(() => {
        const savedSearchTerm = sessionStorage.getItem("search");
        if (savedSearchTerm) {
          if(!isAdvanceSearch){
            setSearch(savedSearchTerm);
            fetchSearchApi(type,savedSearchTerm)
          }
        }     
      }, []);
    return (
        <div className='h-full w-full relative'>
            <Search name={`Search ${type}`} setOpen={setOpen} type={type} />
            {
                isAdvanceSearch ?
                    <ResultBox name="Search Result" data={advanceData} type={type} loading={advanceLoading} /> :
                    <ResultBox name="Search Result" data={searchData} type={type} loading={searchLoading} />
            }
            {
                open &&
                <AdvanceSearch setOpen={setOpen} type={type} className={true} />
            }
        </div>
    )
}

export default SearchResult
