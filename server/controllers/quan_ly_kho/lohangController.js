import db from '../../database.js';

const upsertLoHang = async(conn, hang_hoa_id, lot_number, han_su_dung, so_luong) => {
    if (han_su_dung == NULL) {
        const result = await conn.query(
        `INSERT INTO lo_hang (hang_hoa_id, lot_number, han_su_dung, so_luong_ton) VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
        so_luong_ton = so_luong_ton + VALUES(so_luong_ton)
        `,
         [hang_hoa_id, lot_number, han_su_dung, so_luong] );
    return result;
    }
    
}

const addLoHangMoi = async(conn, hang_hoa_id, lot_number, han_su_dung, so_luong) => {
    const result = await conn.query(
        `INSERT INTO lo_hang (hang_hoa_id, lot_number, han_su_dung, so_luong_ton) VALUES (?, ?, ?, ?)`,
         [hang_hoa_id, lot_number, han_su_dung, so_luong] );
    return result;
}

const tangSoLuongTon = async(conn, hang_hoa_id, lot_number, so_luong) => {

}

const giamSoLuongTon = async(conn, hang_hoa_id, lot_number, so_luong) => {

}

const getListLoHang = async (req, res) => {

}

export { addLoHangMoi, tangSoLuongTon, giamSoLuongTon, getListLoHang, upsertLoHang }