//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
//import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Auth/Login';
import ListHangHoa from './pages/HangHoa/ListHangHoa';
import ListPhieuNhap from './pages/NhapHang/ListPhieuNhap'
import ListPhieuBan from './pages/BanHang/ListPhieuBan';
import { useState } from 'react';
import FormSupplier from './pages/supplier/FormSupplier';
import ListSupplier from './pages/supplier/ListSupplier';
import TonKho from './pages/TonKho/TonKho';

function App() {
  const [isLogin, setLogin] = useState(true);
  const [page, setPage] = useState(0);

  let content;
  if (page == 0) {
    content = <h1>Đây là trang chủ</h1>;
  } else if (page == 1) {
    content = <ListHangHoa/>
  } else  if (page == 2) {
    content = <ListPhieuNhap/>
  } else if (page == 3) {
    content = <ListPhieuBan/>;
  } else if (page == 4) {
    content = <> <ListSupplier/></>
  } else if (page == 5) {
    content = <TonKho/>
  }

  return (
    <>
    
    {isLogin ? 
    <div>
    <div className='navlink'>
      <button onClick={() => {setPage(0)}}>Trang chủ</button>
      <button onClick={() => {setPage(1)}}>Quản lý hàng hóa</button>
      <button onClick={() => {setPage(2)}}>Nhập hàng</button>
      <button onClick={() => {setPage(3)}}>Bán hàng</button>
      <button onClick={() => {setPage(4)}}>Nhà cung cấp</button>
      <button onClick={() => {setPage(5)}}>Hàng tồn kho</button>
    </div> 
    {content}
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