import React, { useContext } from 'react';
import './Css/ShopCart.css';
import { ShopContext } from '../Components/Context/ShopContext';
import dropdown_icon from '../Components/Assests/dropdown_icon.png';
import Item from '../Components/Item/Item';

function ShopCart(props) {
  const {all_product} = useContext(ShopContext);
  return (
    <div className='shop-cart'>
      <img className='shop-cart-banner' src={props.banner} alt="" />
      <div className="shop-cart-index">
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>

        <div className="shop-cart-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>

      <div className="shop-cart-product">
  {all_product.map((item, i) => (
    props.category === item.category ? (
      <Item
        key={i}
        id={item.id}
        name={item.name}
        image={item.image}
        new_price={item.new_price}
        old_price={item.old_price}
      />
    ) : null
  ))}
</div>

<div className="shop-cart-loadmore">
  Explore More
</div>

    </div>
  )
}

export default ShopCart;
