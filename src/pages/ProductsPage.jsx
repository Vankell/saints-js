import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard.jsx';
import PageNavbar from '../components/Navbar.jsx';
import { AuthProvider } from '../components/auth/AuthContext';
import { v4 as uuidv4 } from 'uuid';
import Footer from '../components/Footer.jsx';
import { db } from '../components/db/db.jsx';
import { collection, getDocs } from 'firebase/firestore';

function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('default');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const itemsPerPage = 6;
  const [cartItems, setCartItems] = useState([]);
  const [data, setData] = useState([]);

  // Fetch data from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, 'products');
      const productsSnapshot = await getDocs(productsCollection);
      const productsList = productsSnapshot.docs.map((doc) => doc.data());
      setData(productsList);
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

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const location = useLocation();

  useEffect(() => {
    const sortedData = [...data].sort((a, b) => {
      switch (sortOption) {
        case 'priceLowHigh':
          return a.newPrice - b.newPrice;
        case 'priceHighLow':
          return b.newPrice - a.newPrice;
        default:
          return 0;
      }
    });

    const categoryFilteredData = sortedData.filter((product) =>
      selectedCategory === 'all' ? true : product.category === selectedCategory
    );

    const searchParams = new URLSearchParams(location.search);
    const urlSearchQuery = searchParams.get('search');

    if (urlSearchQuery) {
      const searchFilteredData = categoryFilteredData.filter(
        (product) =>
          (product.title && product.title.toLowerCase().includes(urlSearchQuery.toLowerCase())) ||
          (product.company && product.company.toLowerCase().includes(urlSearchQuery.toLowerCase()))
      );
      setFilteredData(searchFilteredData);
    } else {
      setFilteredData(categoryFilteredData);
    }
  }, [location, selectedCategory, sortOption, data]); // add data as a dependency

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredData.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <AuthProvider>
        <PageNavbar />
        <div className='container'>
          <h1>Products</h1>
          <div className='row'>
            <div className='col-md-3'>
              <select onChange={handleCategoryChange} className='form-select'>
                <option value='all'>All Categories</option>
                <option value='sneakers'>Sneakers</option>
                <option value='flats'>Flats</option>
                <option value='heels'>Heels</option>
              </select>
            </div>
            <div className='col-md-9'>
              <div className='d-flex justify-content-end'>
                <select onChange={handleSortChange} className='form-select' style={{ width: 'auto' }}>
                  <option value='default'>Sort by</option>
                  <option value='priceLowHigh'>Price: Low to High</option>
                  <option value='priceHighLow'>Price: High to Low</option>
                </select>
              </div>
              <div className='row'>
                {currentItems.map((product, index) => (
                  <ProductCard key={index} product={product} onBuyNow={handleBuyNowClick} />
                ))}
              </div>
              <div className='d-flex justify-content-center'>
                <nav className='mt-2'>
                  <ul className='pagination'>
                    {pageNumbers.map((number) => (
                      <li key={number} className='page-item'>
                        <a
                          onClick={handleClick}
                          id={number}
                          className='page-link'
                          style={{ cursor: 'pointer', color: 'black' }}>
                          {number}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </AuthProvider>
    </>
  );
}

export default ProductsPage;
