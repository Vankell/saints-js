import LoginComponent from '../components/auth/LogInComponent';
import PageNavbar from '../components/Navbar';
import { Container } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import SignUpComponent from '../components/auth/SignUpComponent';
import { useState } from 'react';
import { AuthProvider } from '../components/auth/AuthContext';
import Footer from '../components/footer';

const AuthenticationPage = () => {
  const [key, setKey] = useState('login');
  return (
    <>
      <AuthProvider>
        <PageNavbar />
        <Container>
          <Tabs
            id='controlled-tab-example'
            activeKey={key}
            onSelect={(k) => setKey(k || '')}
            className='d-flex justify-content-center'>
            <Tab eventKey='login' title='Login' className='w-50 mx-auto'>
              <LoginComponent />
            </Tab>
            <Tab eventKey='signup' title='Create Account' className='w-50 mx-auto'>
              <SignUpComponent />
            </Tab>
          </Tabs>
        </Container>
        <Footer />
      </AuthProvider>
    </>
  );
};

export default AuthenticationPage;
