import React from 'react';
import PageNavbar from '../components/Navbar';
import ShoppingCart from '../components/ShoppingCart';
import { AuthProvider } from '../components/auth/AuthContext';
import Footer from '../components/footer';

function CartPage() {
  return (
    <>
      <AuthProvider>
        <PageNavbar />
        <ShoppingCart />
        <Footer />
      </AuthProvider>
    </>
  );
}

export default CartPage;
