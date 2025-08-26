import express from 'express';
import cors from 'cors';
//import pool from './database.js';
import hanghoaRoutes from './routes/hanghoaRoutes.js';
import nhaphangRoutes from './routes/nhaphangRoutes.js';
import banhangRoutes from './routes/banhangRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/hanghoa', hanghoaRoutes);

app.use('/api/nhaphang', nhaphangRoutes);

app.use('/api/banhang', banhangRoutes);

app.post('/api/login/', (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  if (username === account.username && password === account.password) {
    res.send(true);
  } else {
    res.send(false);
  }
  
})

app.listen(process.env.PORT, () => {
    console.log('Server is running on http://localhost:3000');
})

const account = {
  username: 'admin',
  password: '123'
}