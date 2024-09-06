import React from 'react';
import './DescriptionBox.css';

const DescriptionBox = () => {
  return (
    <div className='desc-box'>
      <div className="descbox-nav">
        <div className="descbox-nav-box">Description</div>
        <div className="descbox-nav-box fade">Reviews (122)</div>
      </div>

      <div className="descbox-desc">
        <p>An e-commerce website is an online platform that facilitates buying and selling of products or services over the internet serves as a virtual marketplace where businesses and individuals showcase their products, interact with customers, and conduct transactions without the need for physical presence. E-commerce websites have gained immernse popularity due to their convenient accessibility, and the global reach they offer.</p>
        <p>E-commerce websties typically display products or services and detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usuallly has its own dedi with relevant information.</p>
      </div>
    </div>
  )
}

export default DescriptionBox;
