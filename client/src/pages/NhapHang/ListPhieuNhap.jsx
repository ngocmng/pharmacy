import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Table, TableBody, TableHead, TableCell, TableRow, TableContainer} from '@mui/material';
import Modal from '@mui/material/Modal';
import PhieuNhapChiTiet from './PhieuNhapChiTiet';
import FormNhapHang from './FormNhapHang';
import { getListPhieuNhap } from '../../api/nhaphangAPI';

function ListPhieuNhap() {
    const [phieuNhaps, setPhieuNhaps] = useState([
        {id: "PN001", ngay_nhap: "23/08/2022", nha_cung_cap: "Traphaco", ten_nhan_vien: "Minh Hà", tong_tien: 350000}, 
        {id: "PN002", ngay_nhap: "23/08/2025", nha_cung_cap: "GSK", ten_nhan_vien: "Minh Hà", tong_tien: 100000}, 
    ]);

    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        const fetchPhieuNhaps = async() => {
            
                const data = await getListPhieuNhap();
                if (data) {
                    setPhieuNhaps(data);
                }
            
        }

        fetchPhieuNhaps();
    }, [])

    let phieuXem;
    
    return (
    <>
        <h1>Nhập hàng</h1>
        <h2>Danh sách phiếu nhập hàng</h2>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {/*<TableCell>STT</TableCell>*/}
                        <TableCell>Mã phiếu nhập</TableCell>
                        <TableCell>Ngày nhập</TableCell>
                        <TableCell>Nhà cung cấp</TableCell>
                        <TableCell>Nhân viên</TableCell>
                        {/*<TableCell>Tổng tiền</TableCell>*/}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {phieuNhaps.map((phieu) => 
                        <TableRow key={phieu.id}>
                            <TableCell>{phieu.id}</TableCell>
                            <TableCell>{new Date(phieu.ngay_nhap).toLocaleDateString()}</TableCell>
                            <TableCell>{phieu.nha_cung_cap}</TableCell>
                            <TableCell>{phieu.ten_nhan_vien}</TableCell>
                            {/*<TableCell>{phieu.tong_tien}</TableCell>*/}
                            <TableCell>
                                <Button variant='contained' 
                                        onClick={() => {
                                            setOpenModal(phieu.id);
                                            phieuXem = phieu;
                                        }}>
                                    Xem chi tiết
                                </Button>
                                
                            </TableCell>
                        </TableRow>
                        
                    )}
                    
                </TableBody>
            </Table>
        </TableContainer>
        <Modal
            open={Boolean(openModal)}
            onClose={() => {setOpenModal(false)}}
        >
            <PhieuNhapChiTiet id={openModal} phieu={phieuXem}/>
        </Modal>
        <p></p>
    </>)
}

export default function NhapHangHome() {

    const [page, setPage] = useState(1);

    let content = <p>abc</p>;
    if (page == 1) {
        content = (
        <>
            <ListPhieuNhap/>
            <Button onClick={() => {setPage(2)}} variant='contained'>
                Thêm phiếu nhập hàng
            </Button>
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