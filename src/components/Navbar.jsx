import { useContext, useState } from "react"
import { NavLink } from "react-router-dom"
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

import { MainContext } from "../Contexts/mainContext"

function Navbar() {
    const {setSearch} = useContext(MainContext)
    const [color,setColor] = useState(false)
    const [clicked,setClicked] = useState(false)

    const navLinkHandler = () =>{
        setClicked(false)
        setSearch('')
    }

    window.addEventListener("scroll", ()=>{
        window.scrollY >= 35 ? setColor(true) : setColor(false)
    })
        
    return (
        <nav className={`w-full h-16 flex items-center ${color ? "backdrop-blur-2xl" : ""} gap-10 text-white fixed top-0 z-30 `}>
            <IoMenu onClick={()=> setClicked(true)} className="text-white text-4xl ml-4 hidden md:block cursor-pointer"/>
            <h1 className="text-3xl ml-8 md:ml-0">Anime Wiki</h1>
            <ul className={` w-1/2 flex items-center gap-6 text-lg cursor-pointer transition-all md:flex-col md:absolute md:z-50 md:bg-black md:top-0 md:h-screen md:gap-24 md:justify-center ${clicked ? "md:left-0" : "md:-left-96"}`}>
            <IoMdClose onClick={()=> setClicked(false)} className="text-4xl absolute top-4 left-4 hidden md:block"/>
                <li><NavLink to="/"  onClick={navLinkHandler} className={({ isActive }) => isActive ? "text-green border-b border-green" : "hover:text-green"}>Home</NavLink></li>
                <li><NavLink to="/anime"  onClick={navLinkHandler} className={({ isActive }) => isActive ? "text-green border-b border-green" : "hover:text-green"}>Anime</NavLink></li>
                <li><NavLink to="/manga"  onClick={navLinkHandler} className={({ isActive }) => isActive ? "text-green border-b border-green" : "hover:text-green"}>Manga</NavLink></li>
                <li><NavLink to="/my-list" onClick={navLinkHandler}  className={({ isActive }) => isActive ? "text-green border-b border-green" : "hover:text-green"}>My List</NavLink></li>
            </ul>
        </nav>
    )
}

export default Navbar
