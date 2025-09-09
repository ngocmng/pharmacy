import express from 'express';
import db from '../database.js';
import { addNhapHang, getListPhieuNhap, getPhieuNhapChiTiet } from '../controllers/quan_ly_kho/nhaphangController.js';

const nhaphangRoutes = express.Router();

//Thêm phiếu nhập hàng
nhaphangRoutes.post('/', addNhapHang);

// Danh sách phiếu nhập hàng
nhaphangRoutes.get('/', getListPhieuNhap);

//Chi tiết 1 phiếu nhập hàng
nhaphangRoutes.get('/:id', getPhieuNhapChiTiet);

export default nhaphangRoutes