import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, deleteDoc, addDoc, getDoc } from 'firebase/firestore';
import { db } from '../components/db/db'; // import your Firestore instance
import { getAuth } from 'firebase/auth';

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    const fetchWishlistItems = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const userDoc = doc(db, 'users', user.uid);
        const userDocSnapshot = await getDoc(userDoc);
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          const wishlistItems = userData.wishlist || [];
          setWishlistItems(wishlistItems);
        } else {
          console.log(`No document found with id: ${user.uid}`);
        }
      } else {
        console.log('No user is signed in.');
      }
    };

    fetchWishlistItems();
  }, []);

  const handleRemoveItem = async (itemId) => {
    await deleteDoc(doc(db, 'users', itemId));
    setWishlistItems(wishlistItems.filter((item) => item.id !== itemId));
  };

  const handleAddToCart = async (item) => {
    const cartCollection = collection(db, 'cart'); // replace 'cart' with your cart collection name
    await addDoc(cartCollection, item);
    handleRemoveItem(item.id);
  };

  return (
    <div className='container'>
      <h1>Wishlist</h1>
      <div className='row'>
        {wishlistItems.map((item) => (
          <div className='col-12' key={item.id}>
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
                      <div className='d-flex flex-column' style={{ width: '120px' }}>
                        <button onClick={() => handleAddToCart(item)} className='btn btn-success m-1'>
                          Add to Cart
                        </button>
                        <button onClick={() => handleRemoveItem(item.id)} className='btn btn-danger m-1'>
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
    </div>
  );
}

export default Wishlist;
