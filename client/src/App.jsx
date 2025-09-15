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
import FormSupplier from './pages/supplier/FormSupplier';
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

/*function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}
*/