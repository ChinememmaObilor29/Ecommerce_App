import { useEffect, useState } from 'react';
import './ListProduct.css';
import cross_icon from '../../assets/cross_icon.png';


const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    await fetch("http://localhost:4000/allproducts")
    .then((res) => res.json())
    .then((data) => {setAllProducts(data) });
  }

  useEffect(() => {
    fetchInfo();
  }, []);

  const remove_product = async (id) => {
    await fetch("http://localhost:4000/removeproduct", {
      method: "POST",
      headers: {
        Accept: "application/json",
        'Content-Type': "application/json"
      },
      body: JSON.stringify({id:id})
    })
    await fetchInfo();
  }

  return (
    <div className='list-pro'>
      <h1>All Products List</h1>
      <div className="list-pro-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="list-pro-all-pro">
        <hr />
        {allproducts.map((product, index) =>{
          return <div key={index} className="list-pro-format-main list-pro-format">
            <img src={product.image} alt="pro-icon" className="list-pro-icon" />
            <p>{product.name}</p>
            <p>${product.old_price}</p>
            <p>${product.new_price}</p>
            <p>{product.category}</p>
            <img onClick={() =>{remove_product(product.id)}} src={cross_icon} alt="remove-icon" className='list-pro-remove-icon' />
          </div>
        })}
      </div>
    </div>
  )
}

export default ListProduct;
