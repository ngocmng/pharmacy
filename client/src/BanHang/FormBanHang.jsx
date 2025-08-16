import { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Paper } from "@mui/material";

const FormBanHang = () => {
    const [ngayBan, setNgayBan] = useState();
    const [nhanVienId, setNhanVienId] = useState(1);
    
    const [maDonThuoc, setMaDonThuoc] = useState();
    const [tenBacSi, setTenBacSi] = useState();
    const [coSoKhamBenh, setCoSoKhamBenh] = useState();
    const [tenBenhNhan, setTenBenhNhan] = useState();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3000/api/banhang",
            {
                method: "POST",
                body: JSON.stringify({ maDonThuoc, tenBacSi, coSoKhamBenh, tenBenhNhan, ngayBan, nhanVienId }),
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );
        const data = await response.json();
        if (data.success) {
            alert("Ghi nhận phiếu bán hàng thành công")
        } else {
            alert("ko thành công: ");
            console.log("err.message: ", data.message);
        }
    }

    return <>
    <h1>Bán hàng</h1>
    <Paper
        sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
        elevation={3}
                
    >
    <form onSubmit={handleSubmit}>
        <div>
            <TextField
            required
            id='ngayBan'
            label='Ngày bán'
            type="date"
            slotProps={{
                inputLabel: {shrink: true}
            }}
            value={ngayBan}
            onChange={e => setNgayBan(e.target.value)}
            />

            <TextField
            id='nhanVienId'
            label='Mã nhân viên'
            value={nhanVienId}
            disabled
            />
        </div>

        <div id='thongTinKeDon' fullWidth>
            <h4>Thông tin đơn thuốc</h4>
            <TextField
            id='maDonThuoc'
            label='Mã đơn thuốc'
            value={maDonThuoc}
            onChange={e => setMaDonThuoc(e.target.value)}
            />

            <TextField
            id='tenBacSi'
            label='Tên bác sĩ'
            value={tenBacSi}
            onChange={e => setTenBacSi(e.target.value)}
            />

            <TextField fullWidth
            id='coSoKhamBenh'
            label='Cơ sở khám bệnh'
            value={coSoKhamBenh}
            onChange={e => setCoSoKhamBenh(e.target.value)}
            />
            
            <TextField
            id='tenBenhNhan'
            label='Tên bệnh nhân'
            value={tenBenhNhan}
            onChange={e => setTenBenhNhan(e.target.value)}
            />

        </div>

        <Button type='reset'>Hủy</Button>
        <Button variant="contained" type="submit">Hoàn thành</Button>
        
    </form>
    </Paper>
    </>
}

export default FormBanHang;