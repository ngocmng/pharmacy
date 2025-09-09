import db from '../../database.js'

const getTonKho = async(req, res) => {
    let conn;
    try {
        conn = await db.pool.getConnection();
        const rows = await conn.query(`
            SELECT lo_hang.*, hang_hoa.ten AS ten_hang_hoa, don_vi_tinh
            FROM lo_hang
            INNER JOIN hang_hoa ON hang_hoa_id = hang_hoa.id
            `)
        res.send(rows)
    } catch (error) {
        console.error("Database operation error: ", error.message);
    } finally {
        if (conn) {
            conn.release();
        }
    }

    res.end()
}

export { getTonKho }
