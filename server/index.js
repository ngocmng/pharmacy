import express from 'express';
import cors from 'cors';
//import pool from './database.js';
import hanghoaRoutes from './routes/hanghoaRoutes.js';
import nhaphangRoutes from './routes/nhaphangRoutes.js';
import banhangRoutes from './routes/banhangRoutes.js';
import tonkhoRoutes from './routes/tonkhoRoutes.js';
import supplierRoutes from './routes/supplierRoutes.js';
import authRoute from './routes/authRoute.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/hanghoa', hanghoaRoutes);

app.use('/api/nhaphang', nhaphangRoutes);

app.use('/api/banhang', banhangRoutes);

app.use('/api/tonkho', tonkhoRoutes)

app.use('/api/nhacungcap', supplierRoutes)

app.post('/api/auth/', authRoute)

app.listen(process.env.PORT, () => {
    console.log('Server is running on http://localhost:3000');
})
