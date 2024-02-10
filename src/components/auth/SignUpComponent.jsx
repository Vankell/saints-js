import React, { useRef, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../db/db';

export default function SignupComponent() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmRef = useRef(null);
  const { signup } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current?.value !== passwordConfirmRef.current?.value) {
      return setError('Passwords do not match!');
    }

    try {
      setError('');
      const userCredential = await signup(emailRef.current?.value ?? '', passwordRef.current?.value ?? '');
      const user = userCredential.user;
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, { email: user.email, wishlist: [] });

      if (emailRef.current) {
        emailRef.current.value = '';
      }

      if (passwordRef.current) {
        passwordRef.current.value = '';
      }
      if (passwordConfirmRef.current) {
        passwordConfirmRef.current.value = '';
      }
      navigate('/');
    } catch {
      setError('Failed to sign up');
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label for='exampleInputEmail1' className='form-label'>
            Email address
          </label>
          <input
            type='email'
            className='form-control'
            placeholder='Type in your email adress'
            ref={emailRef}
            required
          />
          <div className='form-text'>We'll never share your email with anyone else.</div>
        </div>
        <div className='mb-3'>
          <label className='form-label'>Password</label>
          <input
            type='password'
            className='form-control'
            placeholder='Type in your password'
            ref={passwordRef}
            required
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Password Confirmation</label>
          <input
            type='password'
            className='form-control'
            placeholder='Confirm your password'
            id='password-confirm'
            ref={passwordConfirmRef}
            required
          />
        </div>
        <div className='d-flex justify-content-center'>
          <button type='submit' className='btn btn-dark ' style={{ borderRadius: 0 }}>
            Submit
          </button>
        </div>
        {error && (
          <div className='alert alert-danger' role='alert'>
            {error}
          </div>
        )}
      </form>
    </>
  );
}
