import axios from "axios";
import { useState } from "react";

const [tenHH, setTenHH] = useState("meo");
const [loaiHH, setLoaiHH] = useState("thuoc chong tram cam");

const handleSubmit = async(e) => {
    e.preventDefault();
    const response = await axios.post(
        "http://localhost:3000/api/hanghoa/add",
        { tenHH, loaiHH }
    );
    if (response.data.success) {
        alert ("da them HH thanh cong");
        setTenHH("cho");
    } else {
        console.error("Loi khi them HH: ", data);
        alert ("Xay ra loi khi them hang hoa");
    }
}