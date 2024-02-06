import React from 'react';
import { Navigate } from 'react-router';
import error_Image from '../assets/newsbanner.png';

function ErrorPage() {
  return (
    <>
      <div className='d-flex justify-content-center'>
        <h1>Uh oh! Looks like the page you are looking for is in another castle!</h1>
      </div>
      <div className='d-flex justify-content-center'>
        <img src={error_Image} />
      </div>

      <div className='d-flex justify-content-center p-2'>
        <a href='/' className='btn btn-primary'>
          Go Back Home
        </a>
      </div>
    </>
  );
}

export default ErrorPage;
