import express from 'express';
import postRoute from './routes/posts';
import userRoute from './routes/users';
import authRoute from './routes/auth';

const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/posts', postRoute);
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);

//nodemon
app.listen(8000, () => {
  console.log('Server is listening on port 8000');
});
