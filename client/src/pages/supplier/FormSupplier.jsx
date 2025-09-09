import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { addSupplier } from '../../api/supplierAPI';

export default function FormSupplier () {
    const [ten, setTen] = useState("");
    const [email, setEmail] = useState("");
    const [maSoThue, setMaSoThue] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const responseData = await addSupplier(ten, email, maSoThue);
            if (responseData.success) {
                alert("đã thêm nhà cung cấp thành công")
                setTen("");
                setEmail("");
                setMaSoThue("");
            } else {
                alert(responseData.message);
            }
        } catch (error) {
            alert("đã xảy ra lỗi: ", error.message)
        }
        
    }

    return (
        <>
        <h1>Thêm nhà cung cấp</h1>
        <form onSubmit={handleSubmit}>
            <div>
            <TextField sx={{minWidth: 500}}
            required
            id="tenNhaCungCap"
            label="Tên"
            value={ten}
            onChange={(e) => setTen(e.target.value)}
            />

            <TextField
            id="emailNhaCungCap"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
            id="maSoThueNCC"
            label="Mã số thuế"
            value={maSoThue}
            onChange={(e) => setMaSoThue(e.target.value)}
            />
            </div>
            <Button variant='contained' type='submit'>Hoàn thành</Button>
            <p>{ten.mail}</p>
        </form>
        </>
    )
}