import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from 'react';
import PhieuItemLine from './PhieuItemLine';



function PhieuItems({ lines, setLines }) {
    const [hanghoas, setHangHoas] = useState([]);

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
        <h3>Thêm hàng hóa vào phiếu</h3>
        <div>
            <FormControl sx={{ m: 1, minWidth: 300, maxWidth: 600 }}>
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
        
        <table>
            <thead>
                <tr><th>STT</th>
                    <th>Mã HH</th>
                    <th>Tên HH<span className='redAsterisk'>*</span></th>
                    <th>Số lô<span className='redAsterisk'>*</span></th>
                    <th>Hạn sử dụng<span className='redAsterisk'>*</span></th>
                    <th>Đơn vị tính</th>
                    <th>Số lượng<span className='redAsterisk'>*</span></th>
                    <th>Đơn giá nhập<span className='redAsterisk'>*</span></th>
                    <th>Thành tiền</th>
                    {/*<th><Button variant='contained' onClick={addLine}>+</Button></th>*/}
                </tr>
                </thead>
                <tbody>
                    {lines.map((line, index) => 
                        <PhieuItemLine key={line.id} line={line} index={index}
                         ondelete={() => {removeLine(line.id);}} handleChange={handleChange}
                         hanghoas={hanghoas}/>
                    )}
                    
                </tbody>
            </table> 
        </>
    )
}

export default PhieuItems