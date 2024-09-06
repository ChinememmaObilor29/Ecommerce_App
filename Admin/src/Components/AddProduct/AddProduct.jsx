import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';
import { useState } from 'react';

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  }

  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: ""
  });

  const changeHandler = (e) => {
    setProductDetails({...productDetails, [e.target.name]: e.target.value})
  }

  const Add_Product = async () => {
    console.log(productDetails);
    let reponseData;
    let product = productDetails;

    let formData = new FormData();
    formData.append('product', image);

    await fetch('http://localhost:4000/upload', {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      },
      body: formData,
    }).then((res) => res.json()).then((data) =>{reponseData = data});

    if (reponseData.success)
    {
      product.image = reponseData.image_url;
      console.log(product);
      await fetch('http://localhost:4000/addproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          "Content-Type": 'application/json'
        },
        body: JSON.stringify(product),
      }).then((res) => res.json()).then((data) => {
        data.success ? alert("Product Added") : alert("Failed")
      })
    }
  }

  return (
    <div className='add-pro'>
      <div className="add-pro-item-field">
        <p>Product Title</p>
        <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
      </div>
      <div className="add-pro-price">
        <div className="add-pro-item-field">
            <p>Old Price</p>
            <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Type here'  />
        </div>
        <div className="add-pro-item-field">
            <p>New Price</p>
            <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Type here'  />
        </div>
      </div>
      <div className="add-pro-item-field">
        <p>Product Category</p>
        <select value={productDetails.category} onChange={changeHandler} name="category" className='add-pro-selector'>
            <option value="women">Women</option>
            <option value="men">Men</option>
            <option value="kid">Kid</option>
        </select>
      </div>
      <div className="add-pro-item-field">
        <label htmlFor="file-input">
          <img src={image ? URL.createObjectURL(image):upload_area} alt="upload-area" className='add-pro-thumbnail-img' />
        </label>
        <input onChange={imageHandler} type="file" name="image" id="file-input" hidden />
      </div>
      <button onClick={()=>{Add_Product()}} className='add-pro-btn'>ADD</button>
    </div>
  )
}

export default AddProduct;
