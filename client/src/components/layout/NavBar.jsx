import { NavLink } from "react-router-dom"

export default function NavBar () {
  const navItems = [
    {
      title: "Trang chủ",
      href: '/'
    },
    {
      title: "Quản lý hàng hóa",
      href: "/hanghoa",
    },
    {
      title: "Nhập hàng",
      href: "/nhaphang",
    },
    {
      title: "Bán hàng",
      href: '/banhang',
    },
    {
      title: "Nhà cung cấp",
      href: 'nhacungcap',
    },
    { title: "Tồn kho", href: '/tonkho'}
  ]

    return (
      <><nav>
        {navItems.map((item) => 
          <NavLink to={item.href}>
            <button>{item.title}</button>
          </NavLink>
        )}
        
      </nav>
      </>
    )
  }