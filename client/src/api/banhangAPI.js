async function addPhieuBan (maDonThuoc, tenBacSi, coSoKhamBenh, tenBenhNhan, ngayBan, nhanVienId, items) {
    const response = await fetch("http://localhost:3000/api/banhang",
        {
            method: "POST",
            body: JSON.stringify({ maDonThuoc, tenBacSi, coSoKhamBenh, tenBenhNhan, ngayBan, nhanVienId, items }),
            headers: {
                "Content-Type": "application/json",
            }
        }
    );
    const data = await response.json();
    return data;
}

async function getListPhieuBan () {
    const response = await fetch("http://localhost:3000/api/banhang")
    const data = await response.json();
    console.log("list phieu ban response data: " , data)
    return data;
}

async function getPhieuBanDetail (id) {
    const response = await fetch(`http://localhost:3000/api/banhang/${id}`)
    const data = await response.json();
    console.log("fetch phieu ban detail response data: ", data);
    return data;
}

export { addPhieuBan, getListPhieuBan, getPhieuBanDetail }