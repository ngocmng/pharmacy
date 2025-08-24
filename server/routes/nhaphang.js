import express from 'express';
import db from '../database.js';

const nhaphangRoutes = express.Router();

//Thêm phiếu nhập hàng
nhaphangRoutes.post('/', async(req, res) => {
    console.log(req.body);
    const { supplierId, maHoaDonNHap, ngayNhap, nhanVienId, items } = req.body;
    let conn;
    try {
        conn = await db.pool.getConnection();
        //INSERT vào phieu_nhap_hang
        const pnh = await conn.query("INSERT INTO phieu_nhap_hang (nha_cung_cap_id, ma_hoa_don_nhap, ngay_nhap, nhan_vien_id) VALUES (?, ?, ?, ?)",
            [supplierId, maHoaDonNHap, ngayNhap, nhanVienId]
        );
        console.log("Insert result in phieu_nhap_hang: ", pnh);

        

        //INSERT vào phieu_nhap_hang_items
        const phieuNhapLastId_result = await conn.query("SELECT LAST_INSERT_ID() FROM phieu_nhap_hang");
        const phieuNhapId = phieuNhapLastId_result[0]['LAST_INSERT_ID()'];
        console.log("phieu nhap id: ", phieuNhapId);

        items.forEach(async(item) => {//INSERT vào lo_hang va phieu nhap items
            
            try {
                //INSERT vào lo_hang
                const result = await conn.query("INSERT INTO lo_hang (hang_hoa_id, lot_number, han_su_dung) VALUES (?, ?, ?)",
                    [item.maHH, item.lotNo, item.hsd] );
                console.log("Insert result in lo_hang: ", result);

                //INSERT vào phieu nhap items    
                const result2 = await conn.query("INSERT INTO phieu_nhap_hang_items (phieu_nhap_hang_id, hang_hoa_id, lot_number, so_luong, gia_nhap) VALUES (?, ?, ?, ?, ?)",
                    [phieuNhapId, item.maHH, item.lotNo, item.soLuong, item.donGiaNhap]);
                console.log("Insert result in phieu nhap items: ", result2);
            } catch (err) {
                console.error("Lỗi khi insert từng dòng:", err);
                throw err;
            }
            
        });
        
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

// Danh sách phiếu nhập hàng
nhaphangRoutes.get('/', async (req, res) => {
    let conn;
    try {
        conn = await db.pool.getConnection();
          // --- SELECT Query ---
        const rows = await conn.query("SELECT * FROM phieu_nhap_hang");
        res.send(rows);
    } catch (error) {
        console.error("Database operation error: ", err);
        
    } finally {
        if (conn) {
            conn.release(); // Release connection back to the pool
            //console.log("Connection released to pool.");
        }
    }
})

export default nhaphangRoutes