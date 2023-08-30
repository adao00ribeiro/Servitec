import { AppProps } from 'next/app'
import '../styles/globals.scss'
import HydrationZustand from '../Components/HydrationZustand'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { QueryClientProvider } from 'react-query';
import queryClient from '../query/queryClient';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <HydrationZustand>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ToastContainer autoClose={3000} />
      </QueryClientProvider>
    </HydrationZustand>
  )
}
export default MyApp
