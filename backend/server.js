const express = require("express");
const multer = require("multer");
const cors = require("cors");
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");
const { v4: uuid } = require("uuid");

const app = express();
app.use(cors());

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter(req, file, cb) {
    if (!file.mimetype.startsWith("image/")) {
      cb(new Error("Only images allowed"));
    }
    cb(null, true);
  }
});

app.post("/api/cartoonify", upload.single("image"), (req, res) => {
  try {
    const id = uuid();
    const inputPath = path.resolve(req.file.path);
    const outputPath = path.resolve(`outputs/${id}.jpg`);

    const { lineWidth = 13, blur = 5, colors = 8 } = req.body;

    const python = spawn("python", [
      path.resolve("cartoonify.py"),
      "--input", inputPath,
      "--output", outputPath,
      "--lineWidth", lineWidth,
      "--blur", blur,
      "--colors", colors
    ],{
  cwd: __dirname
}
);

    python.stderr.on("data", (data) => {
      console.error("Python error:", data.toString());
    });

    python.on("close", (code) => {
      if (code !== 0) {
        return res.status(500).json({ error: "Image processing failed" });
      }
      res.sendFile(path.resolve(outputPath));
    });

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(5000, () => {
  console.log("✅ Server running on http://localhost:5000");
});
