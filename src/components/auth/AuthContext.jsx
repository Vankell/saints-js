import React, { useContext, useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAkMIr3iik7o-byLFqmxmGi_Pepoxabv-M',
  authDomain: 'saints-clothing-6703a.firebaseapp.com',
  projectId: 'saints-clothing-6703a',
  storageBucket: 'saints-clothing-6703a.appspot.com',
  messagingSenderId: '704836982344',
  appId: '1:704836982344:web:3b82dd22d845f4fddcea7d',
  measurementId: 'G-80SPLS16XZ',
};

const app = initializeApp(firebaseConfig);

const AuthContext = React.createContext(undefined);

export const db = getFirestore(app);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

const auth = getAuth(app);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
