import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from 'react';

export default function FormSupplier ({ handleSubmit, formData, setFormData }) {
    function handleChange(e) {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    return (
        <>
        
        <form onSubmit={(e) => handleSubmit(e)}>
            <div>
            <TextField sx={{minWidth: 500}}
            required
            id="tenNhaCungCap"
            name='ten'
            label="Tên"
            value={formData.ten}
            onChange={handleChange}
            />

            <TextField
            id="emailNhaCungCap"
            label="Email"
            name='email'
            value={formData.email}
            onChange={handleChange}
            />

            <TextField
            id="maSoThueNCC"
            label="Mã số thuế"
            name='ma_so_thue'
            value={formData.ma_so_thue}
            onChange={handleChange}
            />

            <TextField
            id="sdtNCC"
            label="số điện thoại"
            name='so_dien_thoai'
            value={formData.so_dien_thoai}
            onChange={handleChange}
            />
            </div>
            <Button variant='contained' type='submit'>Hoàn thành</Button>
        </form>
        </>
    )
}
