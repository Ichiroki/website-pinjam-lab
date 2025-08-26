import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import FormPeminjaman from "./pages/FormPeminjaman"

function App(){
  return (
    <>
      <main className="baseplate">
          <Routes>
              <Route path="/" element={<Home/>}></Route>
              <Route path="/form-peminjaman" element={<FormPeminjaman />}></Route>
          </Routes>
      </main>
    </>
  )
}

export default App