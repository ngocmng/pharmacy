import * as React from 'react';

import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import FormNhapHang from './FormNhapHang';
import { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Table, TableBody, TableHead, TableCell, TableRow, TableContainer} from '@mui/material';

function ListPhieuNhap() {
    return (
    <>
        <h1>Nhập hàng</h1>
        <h2>Danh sách phiếu nhập hàng</h2>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>STT</TableCell>
                        <TableCell>Mã phiếu nhập</TableCell>
                        <TableCell>Ngày nhập</TableCell>
                        <TableCell>Nhà cung cấp</TableCell>
                        <TableCell>Tổng tiền</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>STT</TableCell>
                        <TableCell>Mã phiếu nhập</TableCell>
                        <TableCell>Ngày nhập</TableCell>
                        <TableCell>Nhà cung cấp</TableCell>
                        <TableCell>Tổng tiền</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    </>)
}

export default function NhapHangHome() {

    const [page, setPage] = useState(1);

    let content = <p>abc</p>;
    if (page == 1) {
        content = (
        <>
            <ListPhieuNhap/>
            <Button onClick={() => {setPage(2)}}>Thêm phiếu nhập hàng</Button>
        </>
        ) 
    } else if (page == 2) {
        content = (
            <>
            <Button sx={{ mt: 6, mb:0 }} onClick={() => {setPage(1)}} >
                <ArrowBackIcon fontSize='large'/>
            </Button>
            <FormNhapHang/>
            </>)
    }

    
    return <>{content}</>;
}