import React, { useRef, useState } from 'react';
import { useAuth, AuthProvider } from './AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginComponent() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const { login } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      await login(emailRef.current?.value ?? '', passwordRef.current?.value ?? '');
      if (emailRef.current) {
        emailRef.current.value = '';
      }

      if (passwordRef.current) {
        passwordRef.current.value = '';
      }
      navigate('/');
    } catch {
      setError('Failed to log in, please check if your username and password are correct');
    }
  }

  return (
    <>
      <AuthProvider>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label for='exampleInputEmail1' class='form-label'>
              Email address
            </label>
            <input
              type='email'
              className='form-control'
              controlId='logInEmail'
              placeholder='Type in your email adress'
              ref={emailRef}
              required
            />
          </div>
          <div className='mb-3'>
            <label className='form-label'>Password</label>
            <input
              type='password'
              className='form-control'
              placeholder='Type in your password'
              ref={passwordRef}
              required
              controlId='logInPassword'
            />
          </div>
          <div className='d-flex justify-content-center'>
            <button type='submit' className='btn btn-dark ' style={{ borderRadius: 0 }}>
              Submit
            </button>
          </div>
          {error && (
            <div className='alert alert-danger mt-2' role='alert'>
              {error}
            </div>
          )}
        </form>
      </AuthProvider>
    </>
  );
}
