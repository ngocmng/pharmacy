import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {Table, TableBody, TableHead, TableCell, TableRow, TableContainer} from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import PhieuNhapChiTiet from './PhieuNhapChiTiet';
import FormNhapHang from './FormNhapHang';
import { getListPhieuNhap } from '../../api/nhaphangAPI';

function ListPhieuNhap() {
    const [phieuNhaps, setPhieuNhaps] = useState([
        {id: "PN001", ngay_nhap: "23/08/2022", nha_cung_cap: "Traphaco", ten_nhan_vien: "Minh Hà", tong_tien: 350000}, 
        {id: "PN002", ngay_nhap: "23/08/2025", nha_cung_cap: "GSK", ten_nhan_vien: "Minh Hà", tong_tien: 100000}, 
    ]);

    const [filteredPhieuNhaps, setFilteredPhieuNhaps] = useState(phieuNhaps);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [openModal, setOpenModal] = useState(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    function handleSearch(e) {
        setFilteredPhieuNhaps(
            phieuNhaps.filter(phieu => 
                phieu.id.toString().includes(e.target.value.toLowerCase())
                || (phieu.nha_cung_cap ?? "") .toLowerCase().includes(e.target.value.toLowerCase())
                || (phieu.ten_nhan_vien ?? "").toLowerCase().includes(e.target.value.toLowerCase())
                || (phieu.ma_hoa_don_nhap ?? "").toLowerCase().includes(e.target.value.toLowerCase())
            )
        )
    }

    useEffect(() => {
        const fetchPhieuNhaps = async() => {
            
                const data = await getListPhieuNhap();
                if (data) {
                    setPhieuNhaps(data);
                    setFilteredPhieuNhaps(data);
                }     
        }

        fetchPhieuNhaps();
    }, [])

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredPhieuNhaps.length) : 0;
    
    //phieuXem luu phieu can xem chi tiet
    let phieuXem = {}
    
    return (
    <>
        <h1>Nhập hàng</h1>
        <h2>Danh sách phiếu nhập hàng</h2>
        <div>
            <TextField
            placeholder='Tìm kiếm theo id, nhà cung cấp, nhân viên, mã hóa đơn nhập'
            onChange={handleSearch}
            style={{minWidth: 500}}
            />
        </div>
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {/*<TableCell>STT</TableCell>*/}
                        <TableCell>Mã phiếu nhập</TableCell>
                        <TableCell>Ngày nhập</TableCell>
                        <TableCell>Nhà cung cấp</TableCell>
                        <TableCell>Nhân viên</TableCell>
                        <TableCell>Hóa đơn nhập</TableCell>
                        <TableCell>Tổng tiền</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredPhieuNhaps.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((phieu) => 
                        <TableRow key={phieu.id}>
                            <TableCell>{phieu.id}</TableCell>
                            <TableCell>{new Date(phieu.ngay_nhap).toLocaleDateString()}</TableCell>
                            <TableCell>{phieu.nha_cung_cap}</TableCell>
                            <TableCell>{phieu.ten_nhan_vien}</TableCell>
                            <TableCell>{phieu.ma_hoa_don_nhap}</TableCell>
                            <TableCell>{phieu.tong_tien} đ</TableCell>
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
                    {/*{emptyRows > 0 && (
                        <TableRow style={{ height: 69 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}*/}
                </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredPhieuNhaps.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Số dòng mỗi trang"
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} trên ${count}`}
        />

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