import { Paper } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';

function DanhSachPhieu() {
    const [lines, setLines] = useState([]);

    function addLine () {
        setLines([...lines, {id: lines.length+1}]);
    }

    return (
        <>
        <h3>Thêm hàng hóa vào phiếu</h3>
        <table>
            <thead>
                <tr><th>STT</th>
                    <th>Mã HH</th>
                    <th>Tên HH</th>
                    <th>Số lô</th>
                    <th>Hạn sử dụng</th>
                    <th>Đơn vị tính</th>
                    <th>Số lượng</th>
                    <th>Đơn giá nhập</th>
                    <th>Thành tiền</th>
                    <th><Button variant='contained' onClick={addLine}>+</Button></th>
                </tr>
                </thead>
                <tbody>
                    {lines.map((line, index) => 
                    <tr key={index+1}>
                        <td>{index+1}</td>
                        <td>{line.maHH}</td>
                        <td></td>
                        <td><TextField variant='standard' /></td>
                        <td><TextField variant='standard' type='date' /></td>
                        <td>{line.donViTinh}</td>
                        <td><TextField variant='standard' /></td>
                        <td><TextField variant='standard' /></td>
                        <td></td>
                        <td><Button onClick={() => {setLines(lines.filter(a => a !== line))}}>Delete</Button></td></tr>
                    )}
                </tbody>
            </table>
        </>
    )
}

function FormNhapHang() {
    const [supplierId, setSupplier] = useState();
    const [maHoaDonNHap, setMaHoaDonNhap] = useState()
    const [ngayNhap, setNgayNhap] = useState(''); //Ngay tren phieu nhap
    const [nhanVienId, setNhanVienId] = useState(1);

    const [items, setItems] = useState([]);

    const handleSubmit = async(event) => {
        event.preventDefault();
        const response = await fetch("http://localhost:3000/api/nhaphang",
            {
                method: "POST",
                body: JSON.stringify({supplierId, maHoaDonNHap, ngayNhap, nhanVienId}),
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
            <h1>Thêm phiếu nhập hàng</h1>
            
                <form onSubmit={handleSubmit} autoComplete="off" >   
                    <div>
                        <TextField
                        required
                        id="supplier"
                        label="Nhà cung cấp"
                        //value={supplierId}
                        onChange={e => setSupplier(e.target.value)}
                        defaultValue='1'
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
                        <DanhSachPhieu />
                    </div>

                    <div>                    
                    <Button>Hủy</Button>
                    <Button variant="contained">Hoàn thành</Button>
                    </div>
                </form> 
            
            
        </>
        
    )
}
export default FormNhapHang;