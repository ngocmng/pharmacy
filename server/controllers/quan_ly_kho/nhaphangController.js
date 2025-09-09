
import { addLoHangMoi, tangSoLuongTon, upsertLoHang } from './lohangController.js';
import db from '../../database.js';

//Thêm phiếu nhập hàng
const addNhapHang = async(req, res) => {
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


        //INSERT vào phieu_nhap_hang_items va lo_hang
        const phieuNhapLastId_result = await conn.query("SELECT LAST_INSERT_ID() FROM phieu_nhap_hang");
        const phieuNhapId = phieuNhapLastId_result[0]['LAST_INSERT_ID()'];
        console.log("phieu nhap id: ", phieuNhapId);

        items.forEach(async(item) => {//INSERT vào lo_hang va phieu nhap items
            try {
                //INSERT vào lo_hang
                
                const result = await upsertLoHang(conn, item.maHH, item.lotNo, item.hsd, item.soLuong);
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
}

// Danh sách phiếu nhập hàng
const getListPhieuNhap = async (req, res) => {
    let conn;
    try {
        conn = await db.pool.getConnection();
          // --- SELECT Query ---
        const rows = await conn.query(`
            SELECT phieu_nhap_hang.*, nhan_vien.ten AS ten_nhan_vien, nha_cung_cap.ten AS nha_cung_cap
            FROM phieu_nhap_hang
            INNER JOIN nhan_vien ON nhan_vien_id = nhan_vien.id
            INNER JOIN nha_cung_cap ON nha_cung_cap_id = nha_cung_cap.id`
            
        );
        res.send(rows);
    } catch (error) {
        console.error("Database operation error: ", error.message);
        
    } finally {
        if (conn) {
            conn.release(); // Release connection back to the pool
            //console.log("Connection released to pool.");
        }
    }
}

//Chi tiết 1 phiếu nhập hàng
const getPhieuNhapChiTiet = async (req, res) => {
    console.log("req.params = ", req.params);

    const {id} = req.params;
    
    let conn;
    try {
        conn = await db.pool.getConnection();
          // --- SELECT Query ---
        const sql = `
            SELECT phieu_nhap_hang_items.*, (so_luong * gia_nhap) AS thanh_tien, 
                hang_hoa.ten AS ten_hang_hoa, lo_hang.han_su_dung
            FROM phieu_nhap_hang_items 
            INNER JOIN hang_hoa ON phieu_nhap_hang_items.hang_hoa_id = hang_hoa.id
            INNER JOIN lo_hang ON phieu_nhap_hang_items.hang_hoa_id = lo_hang.hang_hoa_id 
                        AND phieu_nhap_hang_items.lot_number = lo_hang.lot_number
            WHERE phieu_nhap_hang_id = ?`
        const rows = await conn.query(sql, [Number(id)]);

        const [totalRow] = await conn.query(
            `SELECT SUM(so_luong * gia_nhap) AS total
            FROM phieu_nhap_hang_items
            WHERE phieu_nhap_hang_id = ?`,
            [Number(id)]
        );
        const total = totalRow.total
        console.log("total: ", total);
        res.json({rows, total});
    } catch (error) {
        console.error("Database operation error: ", error);
    } finally {
        if (conn) {
            conn.release(); // Release connection back to the pool
            //console.log("Connection released to pool.");
        }
    }
}

export { addNhapHang, getListPhieuNhap, getPhieuNhapChiTiet }; 