import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import {TableContainer, Table, TableBody, TableHead, TableFooter, TableRow, TableCell } from '@mui/material';
import { useEffect, useState } from 'react';
import PhieuItemLine from './PhieuItemLine';



function PhieuItems({ lines, setLines }) {
    const [hanghoas, setHangHoas] = useState([
        {id: 1, ten: "mèo", loai_hang_hoa: "anti-depressant", don_vi_tinh: 'con'},
        {id: 2, ten: "chó", loai_hang_hoa: "anti-depressant", don_vi_tinh: 'con'},
        {id: 3, ten: "mèo con", loai_hang_hoa: "anti-depressant", don_vi_tinh: 'con'},
        {id: 4, ten: "chó con", loai_hang_hoa: "anti-depressant", don_vi_tinh: 'con'},
    ]);
    
    const total = lines.reduce((sum, line) => {
        //const soLuong = Number(line.soLuong) || 0;
        //const
        return sum + line.soLuong * line.donGiaNhap;
    }, 0);

    useEffect(() => {
        const fetchHangHoas = async() => {
            try {
                const response = await fetch("http://localhost:3000/api/hanghoa")
                const data = await response.json();
                console.log("data: " ,data)
                setHangHoas(data);
                console.log("hanghoas: ", hanghoas);
            } catch(error) {
                console.error("Error fetching hang hoa: ", error);
            }
        }

        fetchHangHoas();
    }, [])

    /*function addLine () {
        setLines([...lines, {id: Date.now(), soLuong: 0, donGiaNhap: 0, tenHH: ''}]);
    }*/

    function removeLine(id) {
        setLines(lines.filter(a => a.id !== id))
    }

    function handleChange (index, field, value) {
        const updated = [...lines];
        updated[index][field] = value;
        setLines(updated);
    };

    function handleSelectHangHoa (id) {
        console.log("hanghoas after effect: ", hanghoas);
        console.log("id: ", id);
        const hanghoa = hanghoas.find(element => element.id == id);
        console.log("hàng hóa vừa chọn: ", hanghoa);
        setLines([...lines, {id: Date.now(), soLuong: 0, donGiaNhap: 0, tenHH: hanghoa.ten, donViTinh: hanghoa.don_vi_tinh, maHH: id}]);
    }

    return (
        <>
        <h4>Thêm hàng hóa vào phiếu</h4>
        <div>
            <FormControl sx={{ minWidth: 300 }}>
                <InputLabel htmlFor="select-product">
                    Chọn hàng hóa
                </InputLabel>
                <Select 
                    
                    label="Chọn hàng hóa"
                    inputProps={{
                        id:'select-product'
                    }}
                >
                    {hanghoas.map(hanghoa => 
                            <MenuItem value={hanghoa.id} onClick={() => {handleSelectHangHoa(hanghoa.id)}}>{hanghoa.ten}</MenuItem>)}
                </Select>
            </FormControl>
            
        </div>
        
        <Table>
            <TableHead >
                <TableRow>
                    <TableCell>STT</TableCell>
                    <TableCell>Mã HH</TableCell>
                    <TableCell>Tên HH<span className='redAsterisk'>*</span></TableCell>
                    <TableCell>Số lô<span className='redAsterisk'>*</span></TableCell>
                    <TableCell>Hạn sử dụng<span className='redAsterisk'>*</span></TableCell>
                    <TableCell>Đơn vị tính</TableCell>
                    <TableCell>Số lượng<span className='redAsterisk'>*</span></TableCell>
                    <TableCell>Đơn giá nhập<span className='redAsterisk'>*</span></TableCell>
                    <TableCell>Thành tiền</TableCell>
                    
                    {/*<TableCell><Button variant='contained' onClick={addLine}>+</Button></TableCell>*/}
                </TableRow>
                </TableHead>
                <TableBody>
                    {lines.map((line, index) => 
                        <PhieuItemLine key={line.id} line={line} index={index}
                         ondelete={() => {removeLine(line.id);}} handleChange={handleChange}
                         hanghoas={hanghoas}/>
                    )}
                    
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={8} align='center'>Tổng tiền: </TableCell>
                        <TableCell>{total.toLocaleString()} đ</TableCell>
                    </TableRow>
                </TableFooter>
            </Table> 
        </>
    )
}

export default PhieuItems