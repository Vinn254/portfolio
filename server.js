const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const cors = require('cors');
const { Readable } = require('stream');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('backend/frontend'));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post('/upload', upload.single('video'), async (req, res) => {
  try {
    const { title, description, github } = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ error: 'No file uploaded' });

    const result = await cloudinary.uploader.upload_stream(
      { resource_type: 'video', folder: 'portfolio' },
      (error, result) => {
        if (error) return res.status(500).json({ error });
        return res.status(200).json({
          title,
          description,
          github,
          videoUrl: result.secure_url,
        });
      }
    );

    const stream = Readable.from(file.buffer);
    stream.pipe(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("🚀 Backend running on http://localhost:5000"));
