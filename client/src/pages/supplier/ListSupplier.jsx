import Button from '@mui/material/Button';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell, TextField} from '@mui/material';
import Modal from '@mui/material/Modal';
import TablePagination from '@mui/material/TablePagination';
import { useState, useEffect } from 'react';
import { getSuppliers } from '../../api/supplierAPI';
import { ButtonSua, ButtonXoa } from '../../components/buttons';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import FormSupplier from './FormSupplier'
import { editSupplier, deleteSupplier } from '../../api/supplierAPI';

function ListSupplier () {
    const [suppliers, setSuppliers] = useState([])
    const [filteredSuppliers, setFilteredSuppliers] = useState([])

    const [supplierDelete, setSupplierDelete] = useState({})
    const [supplierEdit, setSupplierEdit] = useState({})

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };



    async function fetchSuppliers() {
        const data = await getSuppliers();
        if (data) {
            setSuppliers(data);
            setFilteredSuppliers(data)
        }
    }
    
    useEffect(() => { 
        fetchSuppliers();
    }, [])

    //khi nhấn nút Xóa nhà cung cấp
    function handleDelete (supplier) {
        setSupplierDelete(supplier);
        setOpenDeleteDialog(true)
    }

    //Khi xác nhận xóa trong Dialog
    async function confirmDelete() {     
        try {
            const data = await deleteSupplier(supplierDelete.id)
            if (data.success) {
                alert(`Đã xóa thành công nhà cung cấp ${supplierDelete.ten}`)
                //fetchSuppliers()
            } else {
                alert(data.message)
            }
        } catch (error) {
            console.error(error)
            alert("Xảy ra lỗi khi xóa nhà cung cấp")
        } finally {
            setOpenDeleteDialog(false);
            setSupplierDelete({})
        }
    }

    //Khi cancel việc xóa trong Dialog
    function cancelDelete() {
        setOpenDeleteDialog(false)
        setSupplierDelete({})
    }

    //Nhấn nút Sửa
    function handleEdit (supplier) {
        setSupplierEdit(supplier);
        setOpenEditDialog(true);
    }

    async function submitEdit (e) {
        e.preventDefault();
        const { id, ten, email, ma_so_thue, so_dien_thoai } = supplierEdit;
        try {
            const responseData = await editSupplier(id, ten, email, ma_so_thue, so_dien_thoai);
            if (responseData.success) {
                alert("đã sửa nhà cung cấp thành công")
                 await fetchSuppliers();
            } else {
                alert(responseData.message);
            }
        } catch (error) {
            alert("đã xảy ra lỗi:")
            console.error(error)
        } finally {
            setOpenEditDialog(false);
            setSupplierEdit({})
        }
    }

    function handleSearch(e) {
        setFilteredSuppliers(
            suppliers.filter(supplier => 
                supplier.ten.toLowerCase().includes(e.target.value.toLowerCase())
                || (supplier.email ?? "") .toLowerCase().includes(e.target.value.toLowerCase())
                || (supplier.ma_so_thue ?? "").toLowerCase().includes(e.target.value.toLowerCase())
                || (supplier.so_dien_thoai ?? "").toLowerCase().includes(e.target.value.toLowerCase())
            )
        )
    }

    return (
        <>
        <h1>Danh sách nhà cung cấp</h1>
        <div>
            <TextField
            placeholder='Tìm kiếm theo tên, email, số điện thoại, mã số thuế'
            onChange={handleSearch}
            style={{minWidth: 500}}
            />
        </div>
        <Table stickyHeader>
            <TableHead>
             <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Tên nhà cung cấp</TableCell>
                <TableCell>Mã số thuế</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Số điện thoại</TableCell>
                <TableCell></TableCell>
             </TableRow>
            </TableHead>
            <TableBody>
                {filteredSuppliers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(supplier => 
                    <TableRow key={supplier.id}>
                        <TableCell>{supplier.id}</TableCell>
                        <TableCell>{supplier.ten}</TableCell>
                        <TableCell>{supplier.ma_so_thue}</TableCell>
                        <TableCell>{supplier.email}</TableCell>
                        <TableCell>{supplier.so_dien_thoai}</TableCell>
                        <TableCell>
                            <ButtonSua handleClick={() => {handleEdit(supplier)}} />{' '}
                            <ButtonXoa handleClick={() => {handleDelete(supplier)}} />
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
        {filteredSuppliers.length === 0 && <div>Không tìm thấy kết quả</div>}
        <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredSuppliers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Số dòng mỗi trang"
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} trên ${count}`}
        />

        {/*dialog xác nhận xóa*/ }
        <Dialog
            open={openDeleteDialog}
            onClose={() => {setOpenDeleteDialog(false)}}
        >
            <DialogTitle>Bạn có chắc chắn muốn xóa nhà cung cấp [{supplierDelete.ten || ""}] không ?</DialogTitle>
            <DialogActions>
                <Button onClick={cancelDelete}>Không</Button>
                <Button variant='contained' onClick={confirmDelete}>Có</Button>
            </DialogActions>
        </Dialog>

        {/*dialog edit*/}
        <Dialog 
            open={openEditDialog}
            onClose={() => setOpenEditDialog(false)}
        >
            <DialogTitle>Chỉnh sửa thông tin nhà cung cấp</DialogTitle>
            <DialogContent>
                <FormSupplier handleSubmit={submitEdit} formData={supplierEdit} setFormData={setSupplierEdit}/>
            </DialogContent>
            
        </Dialog>

        </>
    )
}

export default ListSupplier