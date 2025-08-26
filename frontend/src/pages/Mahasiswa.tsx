import { Link } from "react-router-dom";

function Mahasiswa() {
    return (
        <>
            <div className="mahasiswa">
                <Link to={'/'}>Back to home</Link>
                <h1>Mahasiswa</h1>
            </div>
        </>
    );
}

export default Mahasiswa;