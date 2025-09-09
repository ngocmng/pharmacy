async function addPhieuNhap(supplierId, maHoaDonNHap, ngayNhap, nhanVienId, items) {
    try {
        const response = await fetch("http://localhost:3000/api/nhaphang",
            {
                method: "POST",
                body: JSON.stringify({supplierId, maHoaDonNHap, ngayNhap, nhanVienId, items}),
                headers: {
                    "Content-Type": "application/json",
                }
            }
            );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Lỗi khi thêm phiếu nhập hàng: ", error);
    }
}

async function getListPhieuNhap () {
    try {
        const response = await fetch("http://localhost:3000/api/nhaphang")
        const data = await response.json();
        console.log("list phieunhap response data: " , data)
        return data;
    } catch(error) {
        console.error("Error fetching phieu nhaps: ", error)    
    }
}

async function getPhieuNhapDetail(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/nhaphang/${id}`)
        const data = await response.json();
        console.log("response status get phieu nhap detail: ", response.status)
        return data;
    } catch(error) {
        console.error("Error fetching phieu nhap detail: ", error)    
    }             
}

export { addPhieuNhap, getListPhieuNhap, getPhieuNhapDetail }