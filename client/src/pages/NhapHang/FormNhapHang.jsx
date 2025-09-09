import { Paper } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from 'react';
import PhieuItems from '../../components/form/PhieuItems';
import { addPhieuNhap } from '../../api/nhaphangAPI';

function FormNhapHang() {
    const [supplierId, setSupplier] = useState(1);
    const [maHoaDonNHap, setMaHoaDonNhap] = useState()
    const [ngayNhap, setNgayNhap] = useState(); //Ngay tren phieu nhap
    const [nhanVienId, setNhanVienId] = useState(1);

    const [items, setItems] = useState([]);

    
    const handleSubmit = async(event) => {
        event.preventDefault();
        let valid = true;
        items.forEach((item) => {
            if (!item.soLuong || !item.donGiaNhap) {
                valid = false;
            }
        })
        if (valid) {
            const data = await addNhapHang(supplierId, maHoaDonNHap, ngayNhap, nhanVienId, items);
            if (data.success) {
                alert("Ghi nhận phiếu nhập hàng thành công")
            } else {
                alert("ko thành công: " + data.message);
            }
        } else {
            alert("Số lượng và đơn giá phải khác 0");
        }

        
    }
    return (
        <>
        <h2>Thêm phiếu nhập hàng</h2>  
            <form onSubmit={handleSubmit}>
                <div className='flex-container'>
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
                    id="ngayNhap"
                    label="Ngày nhập"
                    slotProps={{
                        inputLabel: {shrink: true}
                    }}
                    type="date"
                    value={ngayNhap}
                    onChange={e => setNgayNhap(e.target.value)}
                    />

                    {/*<TextField
                    id='nhanVienId'
                    label='Mã nhân viên'
                    value={nhanVienId}
                    disabled
                    />  */} 
                </div>
                
                <div>
                    <PhieuItems lines={items} setLines={setItems}/>
                </div>
                
                <Button >Hủy</Button>
                <Button variant="contained" type="submit">Hoàn thành</Button>
            </form>

        </>
        
    )
}
export default FormNhapHang;