import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AlbumProvider } from '../contexts/AlbumContext'
import { AudioProvider } from '../contexts/AudioContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AlbumProvider>
      <AudioProvider>
        <Component {...pageProps} />
      </AudioProvider>
    </AlbumProvider>
  )
}

export default MyApp
