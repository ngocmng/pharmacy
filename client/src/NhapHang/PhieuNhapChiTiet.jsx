import { useState, useEffect } from 'react';
import {Table, TableBody, TableHead, TableCell, TableRow, TableContainer, TableFooter} from '@mui/material';

import Paper from '@mui/material/Paper';
import DetailsLayout from '../components/details_modal/DetailsLayout';

function PhieuNhapChiTiet ({ id, phieu }) {
    
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0)

    useEffect(() => {
        const fetchPhieuNhapChiTiet = async() => {
            try {
                const response = await fetch(`http://localhost:3000/api/nhaphang/${id}`)
                const data = await response.json();
                console.log(response.status)
                if (data) {
                    console.log(data);
                    setItems(data.rows);
                    setTotal(data.total)
                }
            } catch(error) {
                console.error("Error fetching phieu nhaps: ", error)    
            }
        }

        fetchPhieuNhapChiTiet();
    }, [])

    return (
        <DetailsLayout id={id} items={items} total={total} loaiPhieu={"nhap"}/>
    )
}

export default PhieuNhapChiTiet;