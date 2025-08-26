import { Route, Routes } from "react-router-dom"
import Dosen from "./pages/Dosen"
import Home from "./pages/Home"
import Mahasiswa from "./pages/Mahasiswa"

function App(){
  return (
    <>
      <main className="baseplate">
          <Routes>
              <Route path="/" element={<Home/>}></Route>
              <Route path="/dosen/:token" element={<Dosen/>}></Route>
              <Route path="/mahasiswa/:token" element={<Mahasiswa/>}></Route>
          </Routes>
      </main>
    </>
  )
}

export default App