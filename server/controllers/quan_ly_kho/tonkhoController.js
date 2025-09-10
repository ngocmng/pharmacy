import db from '../../database.js'

const getTonKho = async(req, res) => {
    let conn;
    try {
        conn = await db.pool.getConnection();
        /*const rows = await conn.query(`
            SELECT lo_hang.*, hang_hoa.ten AS ten_hang_hoa, don_vi_tinh
            FROM lo_hang
            INNER JOIN hang_hoa ON hang_hoa_id = hang_hoa.id
            `)
        */
       const rowsByHH = await conn.query(
        `SELECT
            hh.id,
            hh.ten AS ten_hang_hoa,
            don_vi_tinh,
            SUM(lh.so_luong_ton) AS tong_ton,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                'lot_number', lh.lot_number,
                'han_su_dung', lh.han_su_dung,
                'so_luong_ton', lh.so_luong_ton
                )
            ) AS lo_hang_chi_tiet
        FROM hang_hoa hh
        JOIN lo_hang lh ON hh.id = lh.hang_hoa_id
        GROUP BY hh.id
        `)
        res.send(rowsByHH)
        //console.log(rowsByHH[0].lo_hang_chi_tiet[1]);
        //console.log(rowsByHH[0].lo_hang_chi_tiet[1].lot_number);
        
    } catch (error) {
        console.error("Database operation error: ", error.message);
        res.status(500).send({message: "Lỗi khi truy vấn dữ liệu lô hàng"})
    } finally {
        if (conn) {
            conn.release();
        }
    }

    res.end()
}

export { getTonKho }
