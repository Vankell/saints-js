import React from 'react';
import { Card, Button, Container } from 'react-bootstrap';
import { AuthProvider, useAuth } from './auth/AuthContext';
import { Navigate } from 'react-router';

export default function AccountComponent() {
  const { currentUser, logout } = useAuth();
  return (
    <>
      <AuthProvider>
        <>
          {currentUser ? (
            <Container className='d-flex justify-content-center'>
              <Card text='dark' style={{ width: '36rem' }} className='px-0'>
                <Card.Header className='text-center' as='h5'>
                  Account Details
                </Card.Header>
                <Card.Body>{`Logged in as ${currentUser?.email}`}</Card.Body>
                <Button variant='dark' onClick={logout} className='mx-auto'>
                  Log Out
                </Button>
              </Card>
            </Container>
          ) : (
            <Navigate to={'/auth'} />
          )}
        </>
      </AuthProvider>
    </>
  );
}
