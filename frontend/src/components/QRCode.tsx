import { QRCodeCanvas } from "qrcode.react";

interface QrCodeParamsType {
    token: string
    role: string
}

function QrCode({token, role}: QrCodeParamsType) {
    // const link = `https://google.com/`
    // const link = `https://website-pinjam-lab.netlify.app/form-peminjaman?token=${encodeURIComponent(token)}&role=${encodeURIComponent(role)}`
    // const link = `https://website-pinjam-lab.netlify.app/form-peminjaman?token=${token}&role=${role}`
    const link = "https://website-pinjam-lab.netlify.app/form-peminjaman?token=" + token + "&role=" + role + ""
    // const link = `http://localhost:5173/form-peminjaman?token=${encodeURIComponent(token)}&role=${encodeURIComponent(role)}`
    // const link = `http://localhost:5173/form-peminjaman?token=${token}&role=${role}`

    return (
        <>
            <div style={{ padding: "16px", display: "inline-block" }}>
                <p>Scan QR untuk pinjam lab</p>
                <QRCodeCanvas 
                value={link} 
                size={300}
                marginSize={5}
                title="Access the form by this QRCode"
                level="M"
                />
                <a href={link}>{link}</a>
            </div>
        </>
    );
}

export default QrCode;