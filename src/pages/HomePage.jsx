import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from '../components/Navbar';
import { AuthProvider } from '../components/auth/AuthContext';
import HomePageNews from '../components/HomePageNews';
import Footer from '../components/footer';

function HomePage() {
  return (
    <>
      <AuthProvider>
        <PageNavbar />
        <HomePageNews />
        <Footer />
      </AuthProvider>
    </>
  );
}

export default HomePage;
