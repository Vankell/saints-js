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
        <Wishlist />
        <Footer />
      </AuthProvider>
    </>
  );
}

export default WishListPage;
