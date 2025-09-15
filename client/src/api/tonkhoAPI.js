import axios from 'axios'

const getTonKho = async() => {
    try {
        const response = await fetch("http://localhost:3000/api/tonkho")
        const data = await response.json();
        if (response.ok) {
            return data;
            
        } else {
            throw Error(data.message)
        }
    } catch(error) {
        console.error("Error fetching hàng tồn kho: ", error.message);
    }
}

export { getTonKho }