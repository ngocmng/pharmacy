//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
//import './App.css'
import { Routes, Route, Outlet } from "react-router-dom";
import Login from './pages/Auth/Login';
import ListHangHoa from './pages/HangHoa/ListHangHoa';
import ListPhieuNhap from './pages/NhapHang/ListPhieuNhap'
import ListPhieuBan from './pages/BanHang/ListPhieuBan';
import { useState } from 'react';
import AddSupplier from "./pages/supplier/AddSupplier";
import ListSupplier from './pages/supplier/ListSupplier';
import TonKho from './pages/TonKho/TonKho';
import Home from "./pages/Home";
import Layout from "./components/layout/Layout";

function App() {
  const [isLogin, setLogin] = useState(1);

  return (
    <> 
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route path="/" element={<Home />}/>
        <Route path="/hanghoa" element={<ListHangHoa />}/>
        <Route path="/nhaphang" element={<ListPhieuNhap />}/>
        <Route path='/banhang' element={<ListPhieuBan/>}/>
        <Route path="/nhacungcap" element={<ListSupplier />}/>
        <Route path="/nhacungcap/add" element={<AddSupplier />}/>
        <Route path="/tonkho" element={<TonKho/>}/>
      </Route>
    </Routes>  

    {isLogin ? 
    <div>
    
    </div>

    : <Login setLogin={setLogin}/>}

    

    </>
    
    
  )
}
export default App;