import { useState, useEffect } from 'react';
import DetailsLayout from '../../components/details_modal/DetailsLayout';
import { getPhieuBanDetail } from '../../api/banhangAPI';

function PhieuBanChiTiet ({ id, phieu }) {
    
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0)

    useEffect(() => {

        const fetchPhieuBanChiTiet = async() => {
            try {
                const data = await getPhieuBanDetail(id);
                if (data) {
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