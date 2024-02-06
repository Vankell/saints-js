import React from 'react';
import { AuthProvider } from '../components/auth/AuthContext';
import PageNavbar from '../components/Navbar';
import AccountComponent from '../components/AccountComponent';
import Footer from '../components/footer';

export default function AccountPage() {
  return (
    <>
      <AuthProvider>
        <PageNavbar />
        <AccountComponent />
        <Footer />
      </AuthProvider>
    </>
  );
}
