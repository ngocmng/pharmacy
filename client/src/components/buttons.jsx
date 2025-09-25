import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { red } from "@mui/material/colors";

function ButtonXoa ({ handleClick }) {;
    return <Button variant="contained" 
                    onClick={handleClick} 
                    style={{backgroundColor: red[900]}} 
                    startIcon={<DeleteIcon />}>Xóa</Button>
}

function ButtonSua ({ handleClick }) {
    return  <Button variant="contained" onClick={handleClick}
                    startIcon={<EditIcon/>} >Sửa</Button>
}

function ButtonXemChiTiet ({ handleClick }) {
    return <Button  onClick={handleClick} >Xem chi tiết</Button>
}

export { ButtonXoa, ButtonSua, ButtonXemChiTiet }