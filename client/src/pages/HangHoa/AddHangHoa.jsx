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
import axios from 'axios';

function AddHangHoa() {
    const [tenHH, setTenHH] = useState("");
    const [loaiHH, setLoaiHH] = useState("");
    const [soDangKy, setSoDangKy] = useState();
    const [nhaSanXuat, setNhaSanXuat] = useState();
    const [quyCach, setQuyCach] = useState();
    const [donVi, setDonVi] = useState();
    const [giaBan, setGiaBan] = useState();

    const [message, setMessage] = useState("");
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
            "http://localhost:3000/api/hanghoa/add",
            { tenHH, loaiHH, soDangKy, nhaSanXuat, quyCach, donVi, giaBan }
            );
            if (response.data.success) {
                alert ("da them HH thanh cong! ");
                setTenHH("");
                setLoaiHH("");
                setMessage("");
            } else {
                setMessage(response.data.message);
            }
            
        } catch (error) {
            if (error.response) {
                console.error("Loi khi them HH o response: ", data);
            } else if (error.request) {
                alert ("Xay ra loi khi request them hang hoa");
            } 
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
                    <div>
                        <TextField
                        required
                        id="tenHH"
                        label="Tên hàng hóa"
                        value={tenHH}
                        onChange={e => setTenHH(e.target.value)}
                        />
                    
                        <FormControl fullWidth required>
                            <InputLabel id="loai-HH-label">Loại hàng hóa</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
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
                    </div>
                    <div>

                        <TextField
                
                        id="soDangKy"
                        label="Số đăng ký"
                        value={soDangKy}
                        onChange={e => setSoDangKy(e.target.value)}
                        />

                        <TextField fullWidth
                        id="nsx"
                        label="Nhà sản xuất"
                        value={nhaSanXuat}
                        onChange={e => setNhaSanXuat(e.target.value)}
                        />
                    </div>
                    <div>

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
