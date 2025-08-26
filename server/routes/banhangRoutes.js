import express from 'express';
import { addBanHang, getListPhieuBan, getPhieuBanChiTiet } from '../controllers/banhangController.js';

const banhangRoutes = express.Router();

//Thêm phiếu bán hàng
banhangRoutes.post('/', addBanHang)

//Danh sách phiếu bán hàng
banhangRoutes.get('/', getListPhieuBan)

//Chi tiết 1 phiếu bán hàng
banhangRoutes.get('/:id', getPhieuBanChiTiet)

export default banhangRoutes