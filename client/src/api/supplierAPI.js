import axios from 'axios'

const addSupplier = async(formData) => {
    try {
        const response = await fetch("http://localhost:3000/api/nhacungcap",
        {
            method: "POST",
            body: JSON.stringify(formData),
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

const getSuppliers = async() => {
    try {
        const response = await fetch("http://localhost:3000/api/nhacungcap")
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            throw Error(data.message);
        }
    } catch (error) {
        console.error (error.message);
    }
}

const editSupplier = async(id, ten, email, maSoThue, soDienThoai) => {
    try {
        const response = await axios.put(`http://localhost:3000/api/nhacungcap/${id}`,
            {ten, email, maSoThue, soDienThoai}
        )
        return response.data
    } catch (error) {
        console.error (error.message)
        return error.response.data
    }
}

const deleteSupplier = async(id) => {
    try {
        const response = await axios.delete(`http://localhost:3000/api/nhacungcap/${id}`)
        return response.data
    } catch (error) {
        console.error (error.message)
        return error.response.data
    }
}

export { addSupplier, getSuppliers, editSupplier, deleteSupplier}