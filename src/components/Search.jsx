import { useContext, useEffect } from "react"
import { MainContext } from "../Contexts/mainContext"
import { useNavigate } from "react-router-dom"

function Search({ name, setOpen, type }) {
    const { search, setSearch, setIsAdvanceSearch, fetchSearchApi } = useContext(MainContext)
    const navigate = useNavigate()

  

      const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearch(value);
        sessionStorage.setItem("search", value);
      };

    const handleOnSubmit = (e) => {
        e.preventDefault()
        fetchSearchApi(type,search)
        setIsAdvanceSearch(false)
        navigate(`/search-result/${type}`)

    }

    return (
        <>
            <header className="w-full h-48 bg-[url('https://media.kitsu.app/anime/47659/poster_image/5ee3aadcc75333d5dae09e7f19315e6c.png')]  bg-cover bg-center flex md:flex-col md:gap-5 items-center justify-center shadow-[inset_0px_0px_120px_11px_rgba(0,0,0,2.1)]">
                <form className="w-1/2 md:w-3/4 h-12 flex items-center justify-center gap-1 md:mt-7" onSubmit={handleOnSubmit}>
                    <input type="text" placeholder={name} value={search} onChange={handleSearchChange} required className=" w-3/4 h-full rounded-xl pl-2 outline-none" />
                    <button className="bg-green text-white rounded-xl h-full w-24">Search</button>
                </form>
                <button className=" border-2 border-white text-white rounded-xl h-12 w-36" onClick={() => setOpen(true)}>Advance Search</button>

            </header>

        </>


    )
}

export default Search
