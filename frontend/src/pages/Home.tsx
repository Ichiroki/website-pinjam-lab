import axios from "axios";
import { useState } from "react";
import QrCode from "../components/QRCode";
import Button from '@mui/joy/Button'
import Modal from '@mui/joy/Modal'
import ModalClose from '@mui/joy/ModalClose'
import Box from '@mui/joy/Box'

interface PayloadDataType {
    token: string
    role: string
}

function Home() {
    const [payloadData, setPayloadData] = useState<PayloadDataType>()
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState<boolean>(false)

    const generateToken = async (role: string) => {
        try {
            const response = await axios.post(`https://website-pinjam-lab-production.up.railway.app/api/generate-token?role=${role}`)
            const data = response.data
            setPayloadData(data)
            setLoading(false)
            setOpen(true)
        } catch(e) {
            console.log(e)
            setLoading(true)
            setOpen(false)
        }
    }

    return (
        <>
            <main className="home">
                <h1 className="block text-2xl mb-32 ">Peminjaman Lab Komputer</h1>
                <Button 
                loading={loading ? true : false}
                variant="outlined" 
                color="primary" 
                onClick={() => generateToken('dosen')}>
                    Dosen
                </Button>
                <Button 
                variant="outlined" 
                color="success" 
                onClick={() => generateToken('mahasiswa')}>
                    Mahasiswa
                </Button>
                <Modal
                    aria-labelledby="modal-title"
                    aria-describedby="modal-desc"
                    open={open}
                    onClose={() => setOpen(false)}
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    <Box
                    sx={{
                        bgcolor: 'background.body',
                        borderRadius: 'md',
                        p: 3,
                        boxShadow: 'lg',
                        minWidth: 400,
                    }}
                    style={{ position: 'relative' }}
                    >
                        <ModalClose 
                        variant="plain" 
                        sx={{ m: 1 }} 
                        style={{ position: 'absolute', top: '15px', right: '15px' }}
                        >
                            X
                        </ModalClose>
                        <h2 id="modal-title" style={{ color: "#333", textAlign: "center", fontSize: "32px" }}>Token Info</h2>
                        <p id="modal-desc">
                            {payloadData ? (
                                <QrCode token={payloadData.token} role={payloadData.role}/>
                            ) : (
                                <>
                                </>
                            )}
                        </p>
                    </Box>
                </Modal>
            </main>
        </>
    );
}

export default Home;