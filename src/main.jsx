import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Anime from './pages/Anime.jsx'
import Manga from './pages/Manga.jsx'
import Details from './pages/Details.jsx'
import GenresPage from './pages/GenresPage.jsx'
import MyList from './pages/MyList.jsx'
import SearchResult from './pages/SearchResult.jsx'

const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : "/",
                element : <Home/>
            },
            ,{
                path : "/anime",
                element : <Anime/>
            },{
                path : "/manga",
                element : <Manga/>
            },{
                path : "/details/:type/:id",
                element : <Details/>
            },{
                path : "/genres/:type/:name/:id",
                element : <GenresPage/>
            },{
                path : "/my-list",
                element : <MyList/>
            },{
                path : "/search-result/:type",
                element : <SearchResult/>
            }
        ]
    }
])
createRoot(document.getElementById('root')).render(
   <RouterProvider router={router}/>
)
