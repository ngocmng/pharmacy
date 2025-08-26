import express from 'express';
import { addHangHoa, listHangHoa } from '../controllers/hanghoaController.js';

const hanghoaRoutes = express.Router()

//Thêm hàng hóa
hanghoaRoutes.post('/add', addHangHoa)

// Danh sách hàng hóa
hanghoaRoutes.get('/', listHangHoa)


export default hanghoaRoutes