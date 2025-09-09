import { Table, TableHead, TableBody, TableRow, TableCell} from '@mui/material';
import { getTonKho } from '../../api/tonkhoAPI';
import { useState, useEffect } from 'react';

const TonKho = () => {
    const [rows, setRows] = useState([])

    useEffect(() => {
        async function fetchHangTonKho() {
            const data = await getTonKho();
            if (data) {
                setRows(data);
            }
        }

        fetchHangTonKho();
        
    }, [])

    return (
        <>
        <h1>Thống kê hàng tồn kho</h1>
        <Table>
            <TableHead>
             <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>Hàng hóa</TableCell>
                <TableCell>Số lô</TableCell>
                <TableCell>Hạn dùng</TableCell>
                <TableCell>Số lượng tồn</TableCell>
             </TableRow>
            </TableHead>

            <TableBody>
                {rows.map((row, index) => 
                    <TableRow key={index}>
                        <TableCell>{index+1}</TableCell>
                        <TableCell>{row.ten_hang_hoa}</TableCell>
                        <TableCell>{row.lot_number}</TableCell>
                        <TableCell>{new Date(row.han_su_dung).toLocaleDateString()}</TableCell>
                        <TableCell>{row.so_luong_ton} ({row.don_vi_tinh})</TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
        </>
    )
}

export default TonKho;