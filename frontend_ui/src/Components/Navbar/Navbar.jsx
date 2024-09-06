import {React, useContext, useRef, useState} from 'react';
import './Navbar.css';
import logo from '../Assests/logo.png';
import cart_icon from '../Assests/cart_icon.png';
import { Link } from 'react-router-dom';
import nav_dropdown from '../Assests/nav_dropdown.png';
import { ShopContext } from '../Context/ShopContext';

const Navbar = () => {
    const [menu, setMenu] = useState("shop");
    const {getTotalCartItems} = useContext(ShopContext);
    const menuRef = useRef();

    const dropdown_toggle = (e) =>{
      menuRef.current.classList.toggle('nav-menu-visible');
      e.target.classList.toggle('open');
    }

  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="logo" />
        <p>SHOPPER</p>
      </div>
      <img onClick={dropdown_toggle} src={nav_dropdown} className='nav-dropdown' alt="nav_dropdown" />
      <ul ref={menuRef} className='nav-menu'>
        <li onClick={()=>{setMenu("shop")}}><Link to="/" className='link'>Shop</Link> {menu==="shop" ? <hr/> : <></>}</li>
        <li onClick={()=>{setMenu("men")}}><Link to="/men" className='link'>Men</Link> {menu==="men" ? <hr/> : <></>}</li>
        <li onClick={()=>{setMenu("women")}}><Link to="/women" className='link'>Women</Link> {menu==="women" ? <hr/> : <></>}</li>
        <li onClick={()=>{setMenu("kids")}}><Link to="/kids" className='link'>Kids</Link> {menu==="kids" ? <hr/> : <></>}</li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem('auth_token') ? <button onClick={()=>{localStorage.removeItem('auth_token');window.location.replace('/')}}>Logout</button> : <Link to="/login"><button>Login</button></Link> }
        <Link to="/cart"><img src={cart_icon} alt="cart_icon" /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  )
}

export default Navbar;