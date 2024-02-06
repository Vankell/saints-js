import React from 'react';

function Footer() {
  return (
    <>
      <div className='container'>
        <footer className='d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top'>
          <p className='col-md-4 mb-0 text-body-secondary'>© 2024 Saints' Company, Ltd</p>

          <a
            href='/'
            className='col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none'>
            <img src='../assets/images/saints_logo.png' alt='' />
          </a>

          <ul className='nav col-md-4 justify-content-end'>
            <li className='nav-item'>
              <a href='/' className='nav-link px-2 text-body-secondary'>
                Home
              </a>
            </li>
            <li className='nav-item'>
              <a href='/products' className='nav-link px-2 text-body-secondary'>
                Products
              </a>
            </li>
            <li className='nav-item'>
              <a href='/account' className='nav-link px-2 text-body-secondary'>
                Account
              </a>
            </li>
            <li className='nav-item'>
              <a href='/Error page test' className='nav-link px-2 text-body-secondary'>
                About us
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </>
  );
}

export default Footer;
