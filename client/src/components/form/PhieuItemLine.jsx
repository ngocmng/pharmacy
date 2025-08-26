import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { TableCell, TableRow } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment'; 

function PhieuItemLine ({ line, index, ondelete, handleChange, hanghoas }) {
    //const [line, setLine] = useState({maHH: '', tenHH: '', lotNo: '', hsd: '', donViTinh: '', soLuong: 0, donGiaNhap: 0})
    
    return (
        <TableRow>
            <TableCell>{index+1}</TableCell>
            <TableCell>{line.maHH}</TableCell>
            <TableCell>
                {line.tenHH}
            </TableCell>
            <TableCell><TextField variant='standard' 
                required
                value={line.lotNo}
                onChange={e => {handleChange(index, "lotNo", e.target.value)}}
                />
            </TableCell>
            <TableCell><TextField variant='standard' 
                required
                type='date' 
                value={line.hsd}
                onChange={e => {handleChange(index, "hsd", e.target.value)}}
                /></TableCell>
            <TableCell>{line.donViTinh}</TableCell>
            <TableCell><TextField variant='standard' 
                required
                type='number' 
                value={line.soLuong}
                onChange={e => {handleChange(index, "soLuong", e.target.value)}}
                />
            </TableCell>
            <TableCell><TextField variant='standard' 
                required
                type='number'
                value={line.donGiaNhap}
                onChange={e => {handleChange(index, "donGiaNhap", e.target.value)}}
                slotProps={{
                    input: {
                        endAdornment: <InputAdornment position="end">đ</InputAdornment>,
                    },
                }}
                />
            </TableCell>
            <TableCell>{(line.soLuong * line.donGiaNhap).toLocaleString()} đ</TableCell>
            <TableCell><Button onClick={ondelete}>Xóa</Button></TableCell>
        </TableRow>
    )

}
export default PhieuItemLine;