import Button from '@mui/material/Button';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell} from '@mui/material';
import Modal from '@mui/material/Modal';
import { useState, useEffect } from 'react';
import { getSuppliers } from '../../api/supplierAPI';
import { ButtonSua, ButtonXoa } from '../../components/buttons';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import FormSupplier from './FormSupplier';

function ListSupplier () {
    const [suppliers, setSuppliers] = useState([])
    const [supplierDelete, setSupplierDelete] = useState({})
    const [supplierEdit, setSupplierEdit] = useState({})

    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);

    useEffect(() => {
        async function fetchSuppliers() {
            const data = await getSuppliers();
            if (data) {
                setSuppliers(data);
            }
        }

        fetchSuppliers();
    }, [])

    //khi nhấn nút Xóa nhà cung cấp
    function handleDelete (supplier) {
        setSupplierDelete(supplier);
        setOpenDeleteDialog(true)
    }

    //Khi xác nhận xóa trong Dialog
    function confirmDelete() {
        setOpenDeleteDialog(false)
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

    return (
        <>
        <h1>Danh sách nhà cung cấp</h1>
        <Table>
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
                {suppliers.map(supplier => 
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
             <TableRow>
                <TableCell></TableCell>
             </TableRow>
            </TableBody>
        </Table>

        <Dialog
            open={openDeleteDialog}
            onClose={() => {setOpenDeleteDialog(false)}}
        >
            <DialogTitle>Bạn có chắc chắn muốn xóa nhà cung cấp [{supplierDelete.ten}] không ?</DialogTitle>
            <DialogActions>
                <Button onClick={cancelDelete}>Không</Button>
                <Button variant='contained' onClick={confirmDelete}>Có</Button>
            </DialogActions>
        </Dialog>

        <Dialog 
            open={openEditDialog}
            onClose={() => setOpenEditDialog(false)}
        >
            <DialogTitle>Chỉnh sửa thông tin nhà cung cấp</DialogTitle>
            <DialogContent>
                <FormSupplier supplier={supplierEdit}/>
            </DialogContent>
            
        </Dialog>

        </>
    )
}

export default ListSupplier