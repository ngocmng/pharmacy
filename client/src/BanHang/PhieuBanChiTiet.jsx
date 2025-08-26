import { useState, useEffect } from 'react';
import DetailsLayout from '../components/details_modal/DetailsLayout';

function PhieuBanChiTiet ({ id, phieu }) {
    
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0)

    useEffect(() => {
        const fetchPhieuBanChiTiet = async() => {
            try {
                const response = await fetch(`http://localhost:3000/api/banhang/${id}`)
                const data = await response.json();
                console.log(response.status)
                if (data) {
                    console.log(data);
                    setItems(data.rows);
                    setTotal(data.total)
                }
            } catch(error) {
                console.error("Error fetching phieu bans: ", error)    
            }
        }

        fetchPhieuBanChiTiet();
    }, [])

    return (
        <DetailsLayout id={id} items={items} total={total} loaiPhieu={"ban"}/>
    )
}

export default PhieuBanChiTiet;