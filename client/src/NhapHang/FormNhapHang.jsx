import { Paper } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from 'react';
import PhieuItems from '../components/PhieuItems';

function FormNhapHang() {
    const [supplierId, setSupplier] = useState(1);
    const [maHoaDonNHap, setMaHoaDonNhap] = useState()
    const [ngayNhap, setNgayNhap] = useState(); //Ngay tren phieu nhap
    const [nhanVienId, setNhanVienId] = useState(1);

    const [items, setItems] = useState([]);

    
    const handleSubmit = async(event) => {
        event.preventDefault();
        const response = await fetch("http://localhost:3000/api/nhaphang",
            {
                method: "POST",
                body: JSON.stringify({supplierId, maHoaDonNHap, ngayNhap, nhanVienId, items}),
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );
        const data = await response.json();
        if (data.success) {
            alert("Ghi nhận phiếu nhập hàng thành công")
        } else {
            alert("ko thành công: " + data.message);
        }
    }
    return (
        <>
        <h2>Thêm phiếu nhập hàng</h2>  
            <form onSubmit={handleSubmit}>
                <div>
                    <TextField
                    required
                    id="supplier"
                    label="Nhà cung cấp"
                    value={supplierId}
                    onChange={e => setSupplier(e.target.value)}
                    />

                    <TextField
                    id="maHoaDonNhap"
                    label="Mã hóa đơn nhập hàng"
                    value={maHoaDonNHap}
                    onChange={e => setMaHoaDonNhap(e.target.value)}
                    />
                
                    <TextField
                    required
                    id="ngay"
                    label="Ngày nhập"
                    slotProps={{
                        inputLabel: {shrink: true}
                    }}
                    type="date"
                    value={ngayNhap}
                    onChange={e => setNgayNhap(e.target.value)}
                    />

                    <TextField
                    id='nhanVienId'
                    label='Mã nhân viên'
                    value={nhanVienId}
                    disabled
                    />   
                </div>
                
                <div>
                    <PhieuItems lines={items} setLines={setItems}/>
                </div>
                
                <Button >Hủy</Button>
                <Button variant="contained" type="submit">Hoàn thành</Button>
            </form>
        <button  className='bold-text' onClick={() => {console.log(items)}}>See what in lines ha</button>

        </>
        
    )
}
export default FormNhapHang;