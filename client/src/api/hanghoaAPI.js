

async function addHH (tenHH, loaiHH, soDangKy, nhaSanXuat, quyCach, donVi, giaBan) {
    try {
        const response = await fetch(
            "http://localhost:3000/api/hanghoa/add",
            {
                method: "POST",
                body: JSON.stringify({ tenHH, loaiHH, soDangKy, nhaSanXuat, quyCach, donVi, giaBan }),
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );
        console.log(response.status);
        const data = await response.json();
        return data;
        
    } catch (error) {
        if (error.response) {
            console.error("Loi khi them HH o response: ", error);
        } else if (error.request) {
            alert ("Xay ra loi khi request them hang hoa ", error);
        } 
    }
}

const getHH = async() => {
    try {
        const response = await fetch("http://localhost:3000/api/hanghoa")
        const data = await response.json();
        console.log("response data: " ,data)

        return data;
    } catch(error) {
        console.error("Error fetching hang hoa: ", error);
    }
}
export { addHH, getHH }