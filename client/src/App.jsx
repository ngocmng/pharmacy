//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import ListHangHoa from './pages/HangHoa/ListHangHoa';
import FormNhapHang from './pages/NhapHang/FormNhapHang';
import AddHangHoa from './pages/HangHoa/AddHangHoa';
import FormBanHang from './pages/BanHang/FormBanHang';
import { useState } from 'react';


function App() {
  const [isLogin, setLogin] = useState(true);
  const [page, setPage] = useState(0);

  let content;
  if (page == 0) {
    content = <h1>Đây là trang chủ</h1>;
  } else if (page == 1) {
    content = <AddHangHoa/>
  } else  if (page == 2) {
    content = <FormNhapHang/>
  } else if (page == 3) {
    content = <FormBanHang/>;
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