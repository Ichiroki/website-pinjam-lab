import { Link } from "react-router-dom";

function Home() {
    return (
        <>
            <main className="home">
                <h1 className="block text-2xl mb-32 ">Peminjaman Lab Komputer</h1>
                <Link className="text-lg block p-5 rounded-md bg-rose-700 hover:bg-rose-500" to={'/dosen'}>Dosen</Link>
                <Link className="text-lg block p-5 rounded-md bg-cyan-700 hover:bg-cyan-500" to={'/mahasiswa'}>Mahasiswa</Link>
            </main>
        </>
    );
}

export default Home;