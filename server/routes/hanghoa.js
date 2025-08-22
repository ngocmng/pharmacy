import express from 'express';
import db from '../database.js';

const hanghoaRoutes = express.Router()

hanghoaRoutes.post('/add', async (req, res) => {
  console.log(req.body);
  const obj = req.body;
  let conn;
  try {
    conn = await db.pool.getConnection(); // Get a connection from the pool

        // --- INSERT Query ---
      const result = await conn.query("INSERT INTO hang_hoa (ten, loai_hang_hoa, so_dang_ky, quy_cach, don_vi_tinh, nha_san_xuat, gia_ban) VALUES (?, ?, ?, ?, ?, ?, ?)", 
        [obj.tenHH, obj.loaiHH, obj.soDangKy, obj.quyCach, obj.donVi, obj.nhaSanXuat, obj.giaBan]);
      console.log("insert results: ", result);
      res.json({success: true});

  } catch (err) {
    console.error("Database operation error:", err);
    res.json({success: false, message: err.message})
  } finally {
        if (conn) {
            conn.release(); // Release connection back to the pool
            console.log("Connection released to pool.");
        }
    }
})

hanghoaRoutes.get('/', (req, res) => {
  listHangHoa(res)
  .catch((err) => {
      console.error("Overall operation failed:", err);
      res.json({success: false, message: err.message})
  });
})

async function listHangHoa(res) {
    let conn;
    try {
    conn = await db.pool.getConnection(); // Get a connection from the pool

        // --- SELECT Query ---
      const rows = await conn.query("SELECT * FROM hang_hoa");
      res.send(rows);

  } catch (err) {
        console.error("Database operation error:");
        throw err; // Re-throw to handle higher up
    } finally {
        if (conn) {
            conn.release(); // Release connection back to the pool
            console.log("Connection released to pool.");
        }
    }
}


export default hanghoaRoutes