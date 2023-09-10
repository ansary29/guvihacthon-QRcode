import React, { useState, useRef } from "react";
import QRCode from "qrcode.react";
import { SketchPicker } from "react-color";
import html2canvas from "html2canvas";
import "bootstrap/dist/css/bootstrap.min.css";
import QRCodeDisplay from "./QRCodeDisplay";
import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Button";

const QRCodeGenerator = () => {
  const [data, setData] = useState("");
  const [width, setWidth] = useState(128);
  const [height, setHeight] = useState(128);
  const [format, setFormat] = useState("png");
  const [qrColor, setQRColor] = useState("#000000");
  const [bgColor, setBGColor] = useState("#FFFFFF");
  const [qrCodeDataURL, setQRCodeDataURL] = useState("");

  const qrCodeImageRef = useRef(null);

  // useEffect(() => {
  //   handleGenerateClick();
  //   // eslint-disable-next-line
  // }, [data, width, height, format, qrColor, bgColor]);

  const handleGenerateClick = () => {
    const qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
      data
    )}&size=${width}x${height}&format=${format}&color=${qrColor.slice(
      1
    )}&bgcolor=${bgColor.slice(1)}`;
    console.log("qrCodeURL", qrCodeURL);

    setQRCodeDataURL(qrCodeURL);
  };

  const handleDownloadClick = () => {
    html2canvas(qrCodeImageRef.current, {
      width: width,
      height: height,
    }).then((canvas) => {
      console.log("Captured Canvas:", canvas);
      const qrCodeDataURL = canvas.toDataURL("image/png");
      console.log("QR Code Data URL:", qrCodeDataURL);
      const a = document.createElement("a");
      a.href = qrCodeDataURL;
      a.download = "qrcode.png";
      a.click();
    });
  };

  return (
    <div className="container mt-4">
      <h2>QR Code Generator</h2>

      <div className="form-group">
        <label> Enter the Data :</label>
        <input
          type="text"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
      </div>
      <div>
        <label>Width :</label>
        <input
          type="text"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
        />
      </div>
      <div>
        <label>Height :</label>
        <input
          type="text"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </div>
      <div>
        <label>QR Code Color :</label>
        <SketchPicker
          color={qrColor}
          onChange={(color) => setQRColor(color.hex)}
        />
      </div>
      <div>
        <label>Background Color:</label>
        <SketchPicker
          color={bgColor}
          onChange={(color) => setBGColor(color.hex)}
        />
      </div>
      <div>
        <label>Format :</label>
        <select value={format} onChange={(e) => setFormat(e.target.value)}>
          <option value="png">PNG</option>
          <option value="jpg">JPG</option>
          <option value="svg">SVG</option>
        </select>
      </div>
      <QRCodeDisplay
        qrCodeData={qrCodeDataURL}
        qrCodeImageRef={qrCodeImageRef}
      />

      <div className="mt-3">
        <Button
          variant="primary"
          className="btn btn-primary mr-2"
          onClick={() => handleGenerateClick()}
        >
          Generate Qr Code
        </Button>
        <Button
          className="btn btn-success"
          onClick={() => handleDownloadClick()}
        >
          Download QR Code
        </Button>
      </div>
      <div>
        <QRCode value={data} size={128} fgColor={qrColor} bgColor={bgColor} />
      </div>
    </div>
  );
};

export default QRCodeGenerator;
