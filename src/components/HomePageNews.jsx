import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './db/db.jsx';
import news_banner from '../assets/newsbanner.png';
import news_car_image from '../assets/placeholdernews.png';
import ProductCard from './ProductCard.jsx';
import { v4 as uuidv4 } from 'uuid';

function HomePageNews() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, 'products');
      const productsSnapshot = await getDocs(productsCollection);
      const productsList = productsSnapshot.docs.map((doc) => doc.data());

      for (let i = productsList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [productsList[i], productsList[j]] = [productsList[j], productsList[i]];
      }

      const randomProducts = productsList.slice(0, 3);

      setProducts(randomProducts);
    };

    fetchProducts();
  }, []);

  const handleBuyNowClick = (product) => {
    const existingCartItem = cartItems.find((item) => item.title === product.title);

    if (existingCartItem) {
      const updatedCartItems = cartItems.map((item) =>
        item.title === product.title ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCartItems);
      localStorage.setItem('shoppingCart', JSON.stringify(updatedCartItems));
    } else {
      const newItem = {
        ...product,
        cartId: uuidv4(),
        quantity: 1,
      };

      const updatedCartItems = [...cartItems, newItem];
      setCartItems(updatedCartItems);
      localStorage.setItem('shoppingCart', JSON.stringify(updatedCartItems));
    }
  };

  return (
    <div className='container'>
      <div className='row d-flex gap-1'>
        <div className='col-md-4 col-xs-12'>
          <img src={news_banner} className='w-100 rounded img-fluid ' />
        </div>
        <div className='col-md-7 col-xs-12'>
          <img src={news_car_image} className='w-100 rounded img-fluid' />
        </div>
      </div>
      <div className='container d-flex justify-content-center'>
        <h1>Featured items</h1>
      </div>
      <div className='container'>
        <div className='row d-flex justify-content-between'>
          {products.map((product, index) => (
            <ProductCard key={index} product={product} onBuyNow={handleBuyNowClick}>
              {/* Override the card here */}
              <div className='card'>
                <img className='card-img-top' src={product.img} alt={product.title} />
                <div className='card-body'>
                  <h5 className='card-title'>{product.title}</h5>
                  <p className='card-text'>{product.description}</p>
                  <div className='d-flex justify-content-center'>
                    <a
                      href='#'
                      className='btn btn-success'
                      style={{ borderRadius: 0 }}
                      onClick={() => handleBuyNowClick(product)}>
                      Add to cart!
                    </a>
                  </div>
                </div>
              </div>
            </ProductCard>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePageNews;
