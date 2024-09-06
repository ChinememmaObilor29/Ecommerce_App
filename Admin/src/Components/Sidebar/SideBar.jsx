import './SideBar.css';
import {Link} from 'react-router-dom';
import add_product_icon from '../../assets/Product_Cart.svg';
import lis_product_icon from '../../assets/Product_list_icon.svg'

const SideBar = () => {
  return (
    <div className='sidebar'>
      <Link to={'/addproduct'} className='link'>
        <div className="sidebar-item">
            <img src={add_product_icon} alt="" />
            <p>Add Product</p>
        </div>
      </Link>
      <Link to={'/listproduct'} className='link'>
        <div className="sidebar-item">
            <img src={lis_product_icon} alt="" />
            <p>Product List</p>
        </div>
      </Link>
    </div>
  )
}

export default SideBar
