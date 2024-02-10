import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ErrorPage from '../pages/ErrorPage';
import AuthenticationPage from '../pages/AuthPage';
import AccountPage from '../pages/AccountPage';
import ProductsPage from '../pages/ProductsPage';
import CartPage from '../pages/CartPage';
import WishListPage from '../pages/WishListPage';
import { AuthProvider } from '../components/auth/AuthContext';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<HomePage />} errorElement={<ErrorPage />} />
      <Route path='/auth' element={<AuthenticationPage />} errorElement={<ErrorPage />} />
      <Route path='/account' element={<AccountPage />} errorElement={<ErrorPage />} />
      <Route path='/products' element={<ProductsPage />} errorElement={<ErrorPage />} />
      <Route path='/cart' element={<CartPage />} errorElement={<ErrorPage />} />
      <Route path='/wishlist' element={<WishListPage />} errorElement={<ErrorPage />} />
    </>
  )
);
