import express from 'express';
import postRoute from './routes/posts.js';
import authRoute from './routes/auth.js';
import userRoute from './routes/users.js';

import cookieParser from 'cookie-parser';
import multer from 'multer';

const app = express();

const PORT = '8080';

app.use(express.json());
app.use(cookieParser());

//* image upload using package multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post('/api/uploads', upload.single('file'), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use('/api/posts', postRoute);
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});
