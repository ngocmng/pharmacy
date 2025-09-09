import { useState, useEffect } from 'react';
import {Table, TableBody, TableHead, TableCell, TableRow, TableContainer, TableFooter} from '@mui/material';

import Paper from '@mui/material/Paper';
import DetailsLayout from '../../components/details_modal/DetailsLayout';
import { getPhieuNhapDetail } from '../../api/nhaphangAPI';

function PhieuNhapChiTiet ({ id, phieu }) {
    
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0)

    useEffect(() => {
        const fetchPhieuNhapChiTiet = async() => {
                const data = await getPhieuNhapDetail(id);
                if (data) {
                    setItems(data.rows);
                    setTotal(data.total)
                } 
        }
        fetchPhieuNhapChiTiet();
    }, [])

    return (
        <DetailsLayout id={id} items={items} total={total} loaiPhieu={"nhap"}/>
    )
}

export default PhieuNhapChiTiet;