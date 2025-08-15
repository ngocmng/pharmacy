import express from 'express';
import db from '../database.js';

const nhaphangRoutes = express.Router();

nhaphangRoutes.post('/', async(req, res) => {
    console.log(req.body);
    const { supplierId, maHoaDonNHap, ngayNhap, nhanVienId } = req.body;
    let conn;
    try {
        conn = await db.pool.getConnection();
        const result = await conn.query("INSERT INTO phieu_nhap_hang (nha_cung_cap_id, ma_hoa_don_nhap, ngay_nhap, nhan_vien_id) VALUES (?, ?, ?, ?)",
            [supplierId, maHoaDonNHap, ngayNhap, nhanVienId]
        );
        console.log("Insert result: ", result);
        console.log("Đã thêm phiếu nhập hàng thành công")
        res.send({success: true})
    } catch (err) {
        console.error("Database operation error:", err);
        res.send({success: false, message: err.message})
    } finally {
        if (conn) {
            conn.release(); // Release connection back to the pool
            console.log("Connection released to pool.");
        }
    }
})

export default nhaphangRoutes