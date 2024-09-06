import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300; index++) {
        cart[index] = 0;
    }
    return cart;
};

const ShopContextProvider = (props) => {
    const [all_product, setAllProduct] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());

    useEffect(() => {
        fetch("http://localhost:4000/allproducts")
            .then(response => response.json())
            .then((data) => setAllProduct(data));
    }, []);

    const addToCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    
        if (localStorage.getItem('auth-token')) {
            fetch("http://localhost:4000/addtocart", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ itemId: itemId })
            })
            .then(response => response.json())
            .then((data) => {
                console.log('Add to cart response:', data);
            })
            .catch((error) => console.error('Fetch error:', error));
        }
    };
    

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: Math.max(prev[itemId] - 1, 0) }));
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item));
                if (itemInfo) {
                    totalAmount += itemInfo.new_price * cartItems[item];
                }
            }
        }
        return totalAmount;
    };

    const getTotalCartItems = () => {
        let totalItems = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItems += cartItems[item];
            }
        }
        return totalItems;
    };

    const contextValue = { getTotalCartItems, getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;


















// import React, { createContext, useState, useEffect } from "react";

// export const ShopContext = createContext(null);

// const getDefaultCart = () => {
//     let cart = {};
//     for (let index = 0; index < 300+1; index++) {
//         cart[index] = 0;        
//     }
//     return cart;
// }

// const ShopContextProvider = (props) => {
//     const [all_product, setAllProduct] = useState([]);

//     const [cartItems, setCartItems] = useState(getDefaultCart());

//     useEffect(() => {
//         fetch("http://localhost:4000/allproducts")
//         .then(response => response.json())
//         .then((data)=> setAllProduct(data))
//     }, []);

//     const addToCart = (itemId) => {
//         setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
//         if (localStorage.getItem('auth-token')) {
//             fetch("http://localhost:4000/addtocart", {
//                 method: 'POST',
//                 headers: {
//                     'Accept': 'application/json',
//                     'auth-token': `${localStorage.getItem('auth-token')}`,
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ itemId: itemId })
//             })
//             .then(response => response.json())
//             .then((data) => {
//                 console.log('Add to cart response:', data);
//             })
//             .catch((error) => console.error('Fetch error:', error));
//         }
//     };

//     const removeFromCart = (itemId) => {
//         setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))

//     }
    
//     const getTotalCartAmount = () => {
//         let totalAmount = 0;
//         for (const item in cartItems) {
//           if (cartItems[item] > 0) {
//             let itemInfo = all_product.find((product) => product.id === Number(item));
//             totalAmount += itemInfo.new_price * cartItems[item];
//           }
//         }
//         return totalAmount;
//       }

//       const getTotalCartItems = () =>{
//         let totalItems = 0;
//         for(const item in cartItems){
//             if(cartItems[item]>0)
//             {
//                 totalItems += cartItems[item];
//             }
//         }
//         return totalItems;
//       }

//     const contextValue = {getTotalCartItems, getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart};

//     return (
//         <ShopContext.Provider value={contextValue}>
//             {props.children}
//         </ShopContext.Provider>
//     );
// }

// export default ShopContextProvider;