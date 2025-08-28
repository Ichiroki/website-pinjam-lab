import { QRCodeCanvas } from "qrcode.react";
import { Link } from "react-router-dom";

interface QrCodeParamsType {
    token: string
    role: string
}

function QrCode({token, role}: QrCodeParamsType) {
    const link = "https://website-pinjam-lab.netlify.app/form-peminjaman?token=" + token + "&role=" + role + ""

    return (
        <>
            <div style={{ padding: "16px", display: "inline-block" }}>
                <p style={{ color: "#333", textAlign: "center" }}>Scan QR untuk pinjam lab</p>
                <QRCodeCanvas 
                value={link} 
                size={300}
                marginSize={5}
                title="Access the form by this QRCode"
                level="M"
                style={{ margin: "auto" }}
                />
                <Link style={{ color: "#333" }} to={link}>{link}</Link>
            </div>
        </>
    );
}

export default QrCode;