import { useState } from "react";
import axios from "axios";
import "./Cartoonify.css";

export default function Cartoonify() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lineWidth, setLineWidth] = useState(13);

  const upload = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);
    formData.append("lineWidth", lineWidth);

    const res = await axios.post(
      "http://localhost:5000/api/cartoonify",
      formData,
      { responseType: "blob" }
    );

    setResult(URL.createObjectURL(res.data));
    setLoading(false);
  };

  return (
    <div className="page">
      <div className="card">
        <h1>Cartoonify Image</h1>
        <div className="head">
          <label className="upload">
          Choose Image
          <input type="file" accept="image/*" hidden
            onChange={e => {
              setImage(e.target.files[0]);
              setPreview(URL.createObjectURL(e.target.files[0]));
            }}
          />
        </label>

        <div className="slider">
          <span className="slider">Edge Intensity</span>
          <input className="slider"
            type="range"
            min="5"
            max="25"
            value={lineWidth}
            onChange={e => setLineWidth(e.target.value)}
          />
        </div>
        </div>
        
         <div className="images">
          {preview && (
            <div>
              <p>Original</p>
              <img src={preview} />
            </div>
          )}</div>

        <button onClick={upload} disabled={!image || loading}>
          {loading ? "Processing..." : "Cartoonify"}
        </button>

        <div className="images">
          {result && (
            <div>
              <p>Cartoon</p>
              <img src={result} />
              <a href={result} className="upload" download="cartoon.jpg">Download</a>
            </div>
          )}
        </div>

        {loading && <div className="overlay">Processing...</div>}
      </div>
    </div>
  );
}
