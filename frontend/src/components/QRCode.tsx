import { QRCodeCanvas } from "qrcode.react";

interface QrCodeParamsType {
    token: string
    role: string
}

function QrCode({token, role}: QrCodeParamsType) {
    let link = "https://facebook.com/fahrezi.rizqiawan"
    return (
        <>
            <div>
                <p>Scan QR untuk pinjam lab</p>
                <QRCodeCanvas 
                value={link} 
                size={300}
                />
                <p>{`${token}` + ` ${role}`}</p>
            </div>
        </>
    );
}

export default QrCode;