import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell} from '@mui/material';
import Paper from '@mui/material/Paper';
import AddHangHoa from './AddHangHoa';
import { getHH } from '../../api/hanghoaAPI';
import {useState, useEffect} from 'react';

function ListHangHoa () {
  const [hanghoas, setHangHoas] = useState([]);

  useEffect(() => {
    async function fetchHangHoas() {
        const data = await getHH();
        if (data) {
            setHangHoas(data);
        }
        
       // console.log("hanghoas: ", hanghoas);
    }
    fetchHangHoas();      
  }, [])

  return (
    <>
      <h1>Danh mục hàng hóa</h1>
      <Button variant='contained'>Thêm mới hàng hóa</Button>
      
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Mã HH</TableCell>
              <TableCell>Tên HH</TableCell>
              <TableCell>Loại hàng</TableCell>
              <TableCell>Số đăng ký</TableCell>
              <TableCell>Nhà sản xuất</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hanghoas.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.ten}</TableCell>
                <TableCell>{row.loai_hang_hoa}</TableCell>
                <TableCell>{row.so_dang_ky}</TableCell>
                <TableCell>{row.nha_san_xuat}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
     

      <AddHangHoa />
    </>
  )
}

export default ListHangHoa;