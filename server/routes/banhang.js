import express from 'express';
import db from '../database.js';

const banhangRoutes = express.Router();

banhangRoutes.post('/', async(req, res) => {
    console.log(req.body);
    const { maDonThuoc, tenBacSi, coSoKhamBenh, tenBenhNhan, ngayBan, nhanVienId } = req.body;
    let conn;
    try {
        conn = await db.pool.getConnection();
        const sql = 
            "INSERT INTO phieu_ban_hang (ma_don_thuoc, ten_bac_si, co_so_kham_benh, ten_benh_nhan, ngay_ban, nhan_vien_id) VALUES (?, ?, ?, ?, ?, ?)";
        const result = await conn.query(sql, [maDonThuoc, tenBacSi, coSoKhamBenh, tenBenhNhan, ngayBan, nhanVienId]);
        console.log("Insert result: ", result);
        console.log("Đã thêm phiếu bán hàng thành công")
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

export default banhangRoutes