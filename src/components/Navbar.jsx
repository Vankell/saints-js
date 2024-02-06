import brand_icon from '../assets/saints_logo.png';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { AuthProvider } from './auth/AuthContext';
import { useAuth } from './auth/AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PageNavbar() {
  const { currentUser, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate(`/products?search=${searchQuery}`);
  };
  return (
    <>
      <AuthProvider>
        <Navbar key={'lg'} expand={'xl'} className='bg-body-tertiary mb-3'>
          <Container>
            <Navbar.Brand href='/'>
              <img alt='' src={brand_icon} width='30' height='30' className='d-inline-block align-top' /> Saints'
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='offcanvasNavbarDropdown-expand-lg' />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-lg`}
              aria-labelledby='offcanvasNavbarDropdown-expand-lg'
              placement='end'>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id='offcanvasNavbarDropdown-expand-lg'>Saints</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className='justify-content-start flex-grow-1 pe-3'>
                  <Nav.Link href='/products'>Products</Nav.Link>
                  <Form className='d-flex justify-content-start ' onSubmit={handleSearchSubmit}>
                    <Form.Control
                      type='search'
                      placeholder='Search'
                      className='me-2'
                      aria-label='Search'
                      value={searchQuery}
                      onChange={handleSearchChange}
                      style={{ borderRadius: 0 }}
                    />
                    <Button variant='secondary' type='submit' style={{ borderRadius: 0 }}>
                      Search
                    </Button>
                  </Form>
                </Nav>
                <Nav className='justify-content-endflex-grow-1 pe-3'>
                  <Nav.Link href='/cart'>Shopping Cart</Nav.Link>
                  <>
                    {currentUser ? (
                      // Display when user is signed in
                      <>
                        <Nav.Link href='/wishlist'>Wishlist</Nav.Link>
                        <Navbar.Text>
                          Signed in as: <a href='/account'>{currentUser.email}</a>
                        </Navbar.Text>
                        <Button variant='light' onClick={logout}>
                          Log Out
                        </Button>
                      </>
                    ) : (
                      // Display when user is not signed in
                      <Button variant='light' href='/auth'>
                        Sign In
                      </Button>
                    )}
                  </>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      </AuthProvider>
    </>
  );
}

export default PageNavbar;
