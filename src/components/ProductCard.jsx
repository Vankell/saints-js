import React from 'react';

function ProductCard({ product, onBuyNow, onAddToWishlist }) {
  return (
    <div className='col-sm-12 col-md-6 col-lg-4'>
      <div className='card h-100 ' style={{ borderRadius: 0 }}>
        <div style={{ height: '200px', overflow: 'hidden' }}>
          <img
            src={product.img}
            className='card-img-top img-fluid p-3'
            style={{ width: '100%', height: '150px', objectFit: 'contain' }}
          />
        </div>
        <div className='card-body d-flex flex-column justify-content-between' style={{ height: '300px' }}>
          <div>
            <h4 className='card-title'>{product.title}</h4>
            <ul className='list-group list-group-flush'>
              {product.prevPrice ? (
                <>
                  <li className='list-group-item'>
                    Price: ${product.newPrice} <s>${product.prevPrice}</s>
                  </li>
                </>
              ) : (
                <li className='list-group-item'>Price: ${product.newPrice}</li>
              )}
              <li className='list-group-item'>Producer: {product.company}</li>
            </ul>
          </div>
          <div className='d-flex justify-content-around'>
            <button className='btn btn-secondary' onClick={() => onAddToWishlist(product)} style={{ borderRadius: 0 }}>
              Add to Wishlist
            </button>
            <button className='btn btn-success' onClick={() => onBuyNow(product)} style={{ borderRadius: '0' }}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
