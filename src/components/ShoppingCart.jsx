import React, { useState, useEffect } from 'react';

function ShoppingCart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const loadedCart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    setCartItems(loadedCart);
  }, []);

  const handleQuantityChange = (cartId, newQuantity) => {
    let updatedCartItems;

    if (newQuantity > 0) {
      updatedCartItems = cartItems.map((item) => (item.cartId === cartId ? { ...item, quantity: newQuantity } : item));
    } else {
      updatedCartItems = cartItems.filter((item) => item.cartId !== cartId);
    }

    setCartItems(updatedCartItems);
    localStorage.setItem('shoppingCart', JSON.stringify(updatedCartItems));
  };

  const handleRemoveItem = (cartId) => {
    const updatedCartItems = cartItems.filter((item) => item.cartId !== cartId);
    setCartItems(updatedCartItems);
    localStorage.setItem('shoppingCart', JSON.stringify(updatedCartItems));
  };
  const totalPrice = cartItems.reduce((total, item) => total + item.newPrice * item.quantity, 0);

  return (
    <div className='container'>
      <h1>Shopping Cart</h1>
      <div className='row'>
        {cartItems.map((item) => (
          <div className='col-12' key={item.cartId}>
            <div className='card mb-3'>
              <div className='row g-0'>
                <div className='col-md-4 d-flex align-items-center justify-content-center'>
                  <img
                    src={item.img}
                    className='card-img-top img-fluid m-2 m-md-0'
                    style={{ width: '100%', height: '100px', objectFit: 'contain' }}
                  />
                </div>
                <div className='col-md-8'>
                  <div className='card-body'>
                    <h5 className='card-title'>{item.title}</h5>
                    <div className='d-flex justify-content-between'>
                      <h4 className='card-text align-self-center'>${item.newPrice}</h4>
                      <div className='d-flex flex-column' style={{ width: '90px' }}>
                        <div className='input-group mb-3'>
                          <input
                            type='number'
                            className='form-control'
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item.cartId, e.target.value)}
                          />
                        </div>
                        <button onClick={() => handleRemoveItem(item.cartId)} className='btn btn-danger'>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='d-flex justify-content-around align-items-center'>
        <h4>Total Price: ${totalPrice.toFixed(2)}</h4>
        <button className='btn btn-success m-2' style={{ borderRadius: 0 }}>
          Check Out
        </button>
      </div>
    </div>
  );
}

export default ShoppingCart;
