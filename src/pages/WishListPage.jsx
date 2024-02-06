import React from 'react';
import { AuthProvider } from '../components/auth/AuthContext';
import PageNavbar from '../components/Navbar';
import Wishlist from '../components/WishList';
import Footer from '../components/footer';

function WishListPage() {
  return (
    <>
      <AuthProvider>
        <PageNavbar />
        Alan is having difficulty with the wishlist page, we're sorry :c
        <Footer />
      </AuthProvider>
    </>
  );
}

export default WishListPage;
