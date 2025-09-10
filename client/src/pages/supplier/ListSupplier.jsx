import Button from '@mui/material/Button';
import { Table, TableContainer, TableHead, TableBody, TableRow, TableCell} from '@mui/material';
import Modal from '@mui/material/Modal';
import { useState, useEffect } from 'react';
import { getSuppliers } from '../../api/supplierAPI';

function ListSupplier () {
    const [suppliers, setSuppliers] = useState([])

    useEffect(() => {
        async function fetchSuppliers() {
            const data = await getSuppliers();
            if (data) {
                setSuppliers(data);
            }
        }

        fetchSuppliers();
    }, [])

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
                            <Button variant='outlined'>Sửa</Button>
                            <Button variant='outlined'>Xóa</Button>
                        </TableCell>
                    </TableRow>
                )}
             <TableRow>
                <TableCell></TableCell>
             </TableRow>
            </TableBody>
        </Table>
        </>
    )
}

export default ListSupplier