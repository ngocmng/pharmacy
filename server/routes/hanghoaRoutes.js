import express from 'express';
import { addHangHoa, listHangHoa, editHangHoa, deleteHangHoa } from '../controllers/hanghoaController.js';

const hanghoaRoutes = express.Router()

//Thêm hàng hóa
hanghoaRoutes.post('/add', addHangHoa)

// Xem hàng hóa
hanghoaRoutes.get('/', listHangHoa)

// Sửa hàng hóa
hanghoaRoutes.put('/:id', editHangHoa)

// Xoa hang hoa
hanghoaRoutes.delete('/:id', deleteHangHoa)

export default hanghoaRoutes