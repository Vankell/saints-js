import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

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
const db = getFirestore(app);

export { db };
