'use client';

import styles from './page.module.css';
import { signIn } from 'next-auth/react';

// Home page just render a button to login with Google
// It uses NextAuth.js to handle authentication
// Since this a api call the callback function handles at the api

export default function HomePage() {
  const handleLogin = () => {
    signIn('google');
  };

  return (
    <main className={styles.container}>
      <button className={styles.button} onClick={handleLogin}>
        Login with Google
      </button>
    </main>
  );
}
