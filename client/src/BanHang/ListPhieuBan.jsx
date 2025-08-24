import * as React from 'react';

import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import FormBanHang from './FormBanHang';
import { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Table, TableBody, TableHead, TableCell, TableRow, TableContainer} from '@mui/material';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


function ListPhieuBan() {
    const [phieuBans, setPhieuBans] = useState([
        {id: "PB001", ngay_ban: "23/08/2021", is_ke_don: false, nhan_vien_id: 1, tong_tien: 350000}, 
        {id: "PB002", ngay_ban: "23/08/2025", is_ke_don: true, nhan_vien_id: 1, tong_tien: 100000}, 
    ]);

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const fetchPhieuBans = async() => {
            try {
                const response = await fetch("http://localhost:3000/api/banhang")
                const data = await response.json();
                console.log("data: " , data)
                if (data) {
                    setPhieuBans(data);
                    console.log("cac phieu ban hang: ", phieuBans);
                }
            } catch(error) {
                console.error("Error fetching phieu bans: ", error)    
            }
        }

        fetchPhieuBans();
    }, [])

    return (
    <>
        <h1>Bán hàng</h1>
        <h2>Danh sách phiếu bán hàng</h2>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {/*<TableCell>STT</TableCell>*/}
                        <TableCell>Mã phiếu bán</TableCell>
                        <TableCell>Ngày bán</TableCell>
                        <TableCell>Loại phiếu</TableCell>
                        <TableCell>Nhân viên</TableCell>
                        <TableCell>Tổng tiền</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {phieuBans.map((phieu) => 
                        <TableRow key={phieu.id}>
                            <TableCell>{phieu.id}</TableCell>
                            <TableCell>{phieu.ngay_ban}</TableCell>
                            <TableCell>{phieu.is_ke_don ? "Bán theo đơn" : "Bán không theo đơn"}</TableCell>
                            <TableCell>{phieu.nhan_vien_id}</TableCell>
                            <TableCell>{phieu.tong_tien}</TableCell>
                            <TableCell>
                                <Button variant='contained' onClick={handleOpen} >Xem chi tiết</Button>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>

        <Modal
        open={open}
        onClose={handleClose}
        
      >
        <Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </>)
}

export default function BanHangHome() {

    const [page, setPage] = useState(1);

    let content = <p>abc</p>;
    if (page == 1) {
        content = (
        <>
            <ListPhieuBan/>
            <Button onClick={() => {setPage(2)}}>Thêm phiếu bán hàng</Button>
        </>
        ) 
    } else if (page == 2) {
        content = (
            <>
            <Button sx={{ mt: 6, mb:0 }} onClick={() => {setPage(1)}} >
                <ArrowBackIcon fontSize='large'/>
            </Button>
            <FormBanHang/>
            </>)
    }

    
    return <>{content}</>;
}