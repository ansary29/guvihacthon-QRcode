import React, { useRef } from "react";

function QRCodeDisplay({ qrCodeData, qrCodeImageRef }) {
  const qrCodeImageContainerRef = useRef(null);
  

  
  return (
    <div className="qrcode-display">
      <h2>QR Code</h2>
      <div ref={qrCodeImageContainerRef}>
        <img
          ref={qrCodeImageRef}
          src={qrCodeData}
          alt="QR Code"
          
        />
      </div>
    </div>
  );
}

export default QRCodeDisplay;
