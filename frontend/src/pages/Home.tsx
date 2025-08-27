import axios from "axios";
import { useState } from "react";
import QrCode from "../components/QRCode";

interface PayloadDataType {
    token: string
    role: string
}[]

function Home() {
    const [payloadData, setPayloadData] = useState<PayloadDataType>()

    const generateToken = async (role: string) => {
        try {
            // const response = await axios.post(`http://localhost:3000/api/generate-token?role=${role}`)
            const response = await axios.post(`https://website-pinjam-lab-production.up.railway.app/api/generate-token?role=${role}`)
            const data = response.data
            setPayloadData(data)
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <>
            <main className="home">
                <h1 className="block text-2xl mb-32 ">Peminjaman Lab Komputer</h1>
                <button className="text-lg block p-5 rounded-md transition bg-rose-700 hover:bg-rose-500" onClick={() => generateToken('dosen')}>Dosen</button>
                <button className="text-lg block p-5 rounded-md transition bg-cyan-700 hover:bg-cyan-500" onClick={() => generateToken('mahasiswa')}>Mahasiswa</button>
                {payloadData ? (
                    <QrCode token={payloadData.token} role={payloadData.role}/>
                ) : (
                    <>
                    </>
                )}
            </main>
        </>
    );
}

export default Home;