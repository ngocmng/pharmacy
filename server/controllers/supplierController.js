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
        console.error("Database operation error:", error);
        res.json({success: false, message: error.message})
    } finally {
        if (conn) {
            conn.release(); // Release connection back to the pool
            console.log("Connection released to pool.");
        }
    }
}

async function getListSupplier (req, res) {
    
}

export { addSupplier, getListSupplier }