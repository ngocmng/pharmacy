import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import PhieuItemLine from './PhieuItemLine';


function PhieuItems({ lines, setLines }) {
    //const [lines, setLines] = useState([]);
    const array = []

    function addLine () {
        setLines([...lines, {id: Date.now(), soLuong: 0, donGiaNhap: 0}]);
    }

    function removeLine(id) {
        setLines(lines.filter(a => a.id !== id))
    }

    function handleChange (index, field, value) {
        const updated = [...lines];
        updated[index][field] = value;
        setLines(updated);
  };

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
                        <PhieuItemLine key={line.id} line={line} index={index}
                         ondelete={() => {removeLine(line.id);}} handleChange={handleChange}/>
                    )}
                    
                </tbody>
            </table> 
        </>
    )
}

export default PhieuItems