import db from '../database.js';

async function addSupplier (req, res) {
    console.log(req.body);
    const {ten, email, maSoThue} = req.body;

    let conn;
    try {
        conn = await db.pool.getConnection();
        const result = await conn.query(`
            INSERT INTO nha_cung_cap (ten, email, ma_so_thue) VALUES(?, ?, ?)`,
            [ten, email, maSoThue]
        )
        console.log("insert supplier results: ", result);
        res.json({success: true});

    } catch (error) {
        console.error("Database operation error:", error.message);
        res.json({success: false, message: error.message})
    } finally {
        if (conn) {
            conn.release(); // Release connection back to the pool
            console.log("Connection released to pool.");
        }
    }
}

async function getListSupplier (req, res) {
    let conn;
    try {
        conn = await db.pool.getConnection();
        const rows = await conn.query(`
            SELECT * FROM nha_cung_cap`,    
        )
        //console.log("nha cung cap: ", rows);
        res.status(200).json(rows);

    } catch (error) {
        console.error("Database operation error:", error.message);
        res.status(500).json({success: false, message: "Lỗi xảy ra khi truy vấn dữ liệu nhà cung cấp."})
    } finally {
        if (conn) {
            conn.release(); // Release connection back to the pool
            console.log("Connection released to pool.");
        }
    }
}

async function editSupplier (req, res) {
    const id = Number(req.params.id)
    const {ten, email, maSoThue, soDienThoai} = req.body;
    console.log(req.params)
    console.log(ten, email, maSoThue, soDienThoai)
    let conn;
    try {
        conn = await db.pool.getConnection();
        const result = await conn.query(`
            UPDATE nha_cung_cap 
            SET ten=?, email=?, ma_so_thue=?, so_dien_thoai=? 
            WHERE id = ?`, 
            [ten||null, email||null, maSoThue||null, soDienThoai||null, id]    
        )
        console.log("update nha cung cap: ", result);
        res.status(200).json({success: true});

    } catch (error) {
        console.error("Database operation error:", error);
        res.status(500).json({success: false, message: "Lỗi xảy ra khi cập nhật nhà cung cấp "+ten})
    } finally {
        if (conn) {
            conn.release(); // Release connection back to the pool
            console.log("Connection released to pool.");
        }
    }
}

async function deleteSupplier (req, res) {
    const {id} = req.params
    let conn;
    try {
        conn = await db.pool.getConnection();
        const result = await conn.query(`
            DELETE FROM nha_cung_cap WHERE id = ?`, [id]    
        )
        console.log("xoa nha cung cap: ", result);
        res.status(200).json({success: true});

    } catch (error) {
        console.error("Database operation error:", error);
        if (error.code === 'ER_ROW_IS_REFERENCED_2') {
            return res.status(409).json({      // 409 Conflict
                success: false,
                message: "Không thể xóa nhà cung cấp vì còn tồn tại phiếu nhập hàng liên quan. Vui lòng xóa hoặc cập nhật các phiếu trước."
            });
        }
        res.status(500).json({success: false, message: "Lỗi xảy ra khi xóa nhà cung cấp."})
    } finally {
        if (conn) {
            conn.release(); // Release connection back to the pool
            console.log("Connection released to pool.");
        }
    }
}

export { addSupplier, getListSupplier, editSupplier, deleteSupplier }