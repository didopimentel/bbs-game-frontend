import { AuthProvider } from '../contexts/auth'
import Router from 'next/router';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
      <AuthProvider>
          <Component {...pageProps} />
      </AuthProvider>
  )
}

export default MyApp
