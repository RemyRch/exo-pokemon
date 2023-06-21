import './App.scss'
import Home from './Pages/Home'
import Pokemon from './Pages/Pokemon'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Nav } from './Components/navbar/Navbar.styles'
import { PokemonsProvider } from './Provider/PokemonsProvider'

function App() {

  return (
    <>
    {/*BrowserRouter Permet d'afficher dans l'historique, page par page  */}
      <BrowserRouter> 
      <PokemonsProvider>
        <Nav />
        <main id="main">
          <Routes>
            <Route path="/" element={<Home/>}/>

            {/* Route amenant à un page d'un pokémon seul, :id est un paramètre qui changera en fonction de l'id du pokémon en question */}
            <Route path="/pokemon/:id" element={<Pokemon />}/>

            {/* Route d'erreur si la page n'existe pas */}
            <Route path="*" element={<h1>Not Found</h1>}/>
          </Routes>
        </main>
      </PokemonsProvider>
      </BrowserRouter>
    </>
  )
}

export default App
