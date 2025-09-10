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
                <TableCell>Mã HH</TableCell>
                <TableCell>Hàng hóa</TableCell>
                <TableCell>Số lô</TableCell>
                <TableCell>Hạn dùng</TableCell>
                <TableCell>Tồn</TableCell>
             </TableRow>
            </TableHead>

            <TableBody>
                {rows.map((row, index) => 
                    <>
                    <TableRow key={index}>
                        <TableCell>{row.id}</TableCell>
                        <TableCell colSpan={3}>{row.ten_hang_hoa}</TableCell>
                        <TableCell>{row.tong_ton} ({row.don_vi_tinh})</TableCell>
                    </TableRow>
                    {row.lo_hang_chi_tiet.map(loHang => 
                        <TableRow>
                            <TableCell colSpan={2}></TableCell>
                            <TableCell>{loHang.lot_number}</TableCell>
                            <TableCell>{loHang.han_su_dung}</TableCell>
                            <TableCell>{loHang.so_luong_ton} ({row.don_vi_tinh})</TableCell>
                    </TableRow>
                    )}
                    
                    </>
                )}
            </TableBody>
        </Table>
        </>
    )
}

export default TonKho;