import * as React from 'react';
import Box from '@mui/material/Box';
import { Paper } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { addHH } from '../../api/hanghoaAPI';

function AddHangHoa() {
    const [tenHH, setTenHH] = useState("");
    const [loaiHH, setLoaiHH] = useState("");
    const [soDangKy, setSoDangKy] = useState('');
    const [nhaSanXuat, setNhaSanXuat] = useState('');
    const [quyCach, setQuyCach] = useState();
    const [donVi, setDonVi] = useState();
    const [giaBan, setGiaBan] = useState();

    const [message, setMessage] = useState("");
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(e.target)
        const data = await addHH(tenHH, loaiHH, soDangKy, nhaSanXuat, quyCach, donVi, giaBan);
        if (data.success) {
            alert ("da them HH thanh cong! ");
            setTenHH("");
            setLoaiHH("");
            setMessage("");
        } else {
            setMessage(response.data.message);
        }
    }
    return (
        <>
            <h1>Thêm mới hàng hóa</h1>
            <Paper
                sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
                elevation={3}
                
            >
                <form onSubmit={handleSubmit} autoComplete="off" >   
                    <div className='flex-container'>
                        <TextField sx={{ minWidth: 600 }}
                        required
                        id="tenHH"
                        label="Tên hàng hóa"
                        value={tenHH}
                        onChange={e => {setTenHH(e.target.value); console.log(e.target)}}
                        />
                    
                        <FormControl required sx={{ minWidth: 300, m: 1 }}>
                            <InputLabel id="loai-HH-label">Loại hàng hóa</InputLabel>
                            <Select
                                labelId="loai-HH-label"
                                id="loaiHH"
                                value={loaiHH}
                                label="Loại hàng hóa"
                                onChange={e => setLoaiHH(e.target.value)}
                            >
                                <MenuItem value="Thuốc">Thuốc</MenuItem>
                                <MenuItem value="Vật tư y tế">Vật tư y tế</MenuItem>
                                <MenuItem value="Mỹ phẩm">Mỹ phẩm</MenuItem>
                            </Select>
                        </FormControl>
                    
                        <TextField
                        id="soDangKy"
                        label="Số đăng ký"
                        value={soDangKy}
                        onChange={e => setSoDangKy(e.target.value)}
                        />
                        </div>
                    <div>

                        <TextField fullWidth
                        id="nsx"
                        label="Nhà sản xuất"
                        value={nhaSanXuat}
                        onChange={e => setNhaSanXuat(e.target.value)}
                        />
                    
                        <TextField
                        id="quycach"
                        label="Quy cách"
                        value={quyCach}
                        onChange={e => setQuyCach(e.target.value)}
                        />

                        <TextField
                        id="donvitinh"
                        label="Đơn vị tính"
                        value={donVi}
                        onChange={e => setDonVi(e.target.value)}
                        />

                        <TextField
                        type='number'
                        id="giaban"
                        label="Giá bán"
                        value={giaBan}
                        onChange={e => setGiaBan(e.target.value)}
                        />
                    
                    </div>
                    <div>
                        
                    </div>
                    <Button variant="contained" type="submit">Hoàn thành</Button>
                    <p>{message}</p>
                </form> 
            </Paper>
            
        </>
        
    )
}
export default AddHangHoa;
