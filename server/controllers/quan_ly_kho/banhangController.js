import db from '../../database.js';

//Thêm phiếu bán hàng
const addBanHang = async(req, res) => {
    console.log(req.body);
    const { maDonThuoc, tenBacSi, coSoKhamBenh, tenBenhNhan, ngayBan, nhanVienId, items } = req.body;
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
}

//Danh sách phiếu bán hàng
const getListPhieuBan = async (req, res) => {
    let conn;
        try {
            conn = await db.pool.getConnection();
              // --- SELECT Query ---
            const rows = await conn.query(`
                SELECT phieu_ban_hang.*, nhan_vien.ten AS ten_nhan_vien 
                FROM phieu_ban_hang
                INNER JOIN nhan_vien ON nhan_vien_id = nhan_vien.id`);
            res.send(rows);
        } catch (error) {
            console.error("Database operation error: ", err);

        } finally {
            if (conn) {
                conn.release(); // Release connection back to the pool
                //console.log("Connection released to pool.");
            }
        }
}

//Chi tiết 1 phiếu bán hàng
const getPhieuBanChiTiet = async(req, res) => {
    console.log("req.params = ", req.params);
    const { id } = req.params;
    let conn;
    try {
        conn = await db.pool.getConnection();
            // --- SELECT Query ---
        const sql = `
            SELECT phieu_ban_hang_items.*, (so_luong * phieu_ban_hang_items.gia_ban) AS thanh_tien, 
                hang_hoa.ten AS ten_hang_hoa, lo_hang.han_su_dung
            FROM phieu_ban_hang_items 
            INNER JOIN hang_hoa ON phieu_ban_hang_items.hang_hoa_id = hang_hoa.id
            INNER JOIN lo_hang ON phieu_ban_hang_items.hang_hoa_id = lo_hang.hang_hoa_id 
                        AND phieu_ban_hang_items.lot_number = lo_hang.lot_number
            WHERE phieu_ban_hang_id = ?`
        const rows = await conn.query(sql, [Number(id)]);

        const [totalRow] = await conn.query(
            `SELECT SUM(so_luong * gia_ban) AS total
            FROM phieu_ban_hang_items
            WHERE phieu_ban_hang_id = ?`,
            [Number(id)]
        );
        const total = totalRow.total
        console.log("total: ", total);
        res.json({rows, total});
    } catch (error) {
        console.error("Database operation error: ", error);
        res.status(500)
    } finally {
        if (conn) {
            conn.release(); // Release connection back to the pool
            //console.log("Connection released to pool.");
        }
    }
}

export { addBanHang, getListPhieuBan, getPhieuBanChiTiet }