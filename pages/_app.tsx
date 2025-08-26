import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AlbumProvider } from '../contexts/AlbumContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AlbumProvider>
      <Component {...pageProps} />
    </AlbumProvider>
  )
}

export default MyApp
