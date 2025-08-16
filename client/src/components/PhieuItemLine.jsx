import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';

function PhieuItemLine ({ line, index, ondelete, handleChange }) {
    //const [line, setLine] = useState({maHH: '', tenHH: '', lotNo: '', hsd: '', donViTinh: '', soLuong: 0, donGiaNhap: 0})
    
    return (
        <tr>
            <td>{index+1}</td>
            <td>{line.maHH}</td>
            <td></td>
            <td><TextField variant='standard' 
                required
                value={line.lotNo}
                onChange={e => {handleChange(index, "lotNo", e.target.value)}}
                />
            </td>
            <td><TextField variant='standard' 
                required
                type='date' 
                value={line.hsd}
                onChange={e => {handleChange(index, "hsd", e.target.value)}}
                /></td>
            <td>{line.donViTinh}</td>
            <td><TextField variant='standard' 
                required
                type='numeric' 
                value={line.soLuong}
                onChange={e => {handleChange(index, "soLuong", e.target.value)}}
                />
            </td>
            <td><TextField variant='standard' 
                required
                type='numeric'
                value={line.donGiaNhap}
                onChange={e => {handleChange(index, "donGiaNhap", e.target.value)}}
                />
            </td>
            <td>{line.soLuong * line.donGiaNhap}</td>
            <td><Button onClick={ondelete}>Delete</Button></td>
        </tr>
    )

}
export default PhieuItemLine;