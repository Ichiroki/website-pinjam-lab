import { Link } from "react-router-dom";

function Dosen() {
    return (
        <>
            <div className="dosen">
                <Link to={'/'}>Back to home</Link>
                <h1>Dosen</h1>
            </div>
        </>
    );
}

export default Dosen;