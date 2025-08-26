import {Table, TableBody, TableHead, TableCell, TableRow, TableContainer, TableFooter} from '@mui/material';

import Paper from '@mui/material/Paper';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function DetailsLayout ({ id, items, total, loaiPhieu }) {
    return (
    <Paper sx={style}>
            <h2>Chi tiết phiếu {loaiPhieu} {id}</h2>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>STT</TableCell>
                        <TableCell>Mã HH</TableCell>
                        <TableCell>Tên HH</TableCell>
                        <TableCell>Số lô</TableCell>
                        <TableCell>Hạn sử dụng</TableCell>
                        <TableCell>Số lượng</TableCell>
                        <TableCell>Đơn giá</TableCell>
                        <TableCell>Thành tiền</TableCell>
                    </TableRow>
                </TableHead>
                {items.length > 0 &&
                <>
                <TableBody>
                    {items.map((item, index) => 
                        <TableRow >
                            <TableCell>{index+1}</TableCell>
                            <TableCell>{item.hang_hoa_id}</TableCell>
                            <TableCell>{item.ten_hang_hoa}</TableCell>
                            <TableCell>{item.lot_number}</TableCell>
                            <TableCell>{item.han_su_dung}</TableCell>
                            <TableCell>{item.so_luong}</TableCell>
                            <TableCell>{item[`gia_${loaiPhieu}`].toLocaleString()} đ</TableCell>
                            <TableCell>{item.thanh_tien.toLocaleString()} đ</TableCell>
                        </TableRow>
                    )}
                </TableBody>
                
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={7} align='center'>Tổng tiền: </TableCell>
                        <TableCell>{total.toLocaleString()} đ</TableCell>
                    </TableRow>
                </TableFooter>
                </>
                }     
            </Table>
            {items.length == 0 && <p style={{textAlign: 'center'}}>Không tìm thấy dữ liệu</p>}
        </Paper>
    )
}

export default DetailsLayout