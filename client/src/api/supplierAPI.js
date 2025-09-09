const addSupplier = async(ten, email, maSoThue) => {
    try {
        const response = await fetch("http://localhost:3000/api/nhacungcap",
        {
            method: "POST",
            body: JSON.stringify({ten, email, maSoThue}),
            headers: {
                "Content-Type": "application/json",
            }
        }
        )
        console.log(response.status);
        const data = await response.json();
        return data;
        
    } catch (error) {
        console.log("Lỗi khi thêm nhà cung cấp", error.message)
        throw error;
    }
    
}

export {addSupplier}