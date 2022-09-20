import '../assets/styles/normalize.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'react-toastify/dist/ReactToastify.min.css';

import { config } from '@fortawesome/fontawesome-svg-core';
import { getCookie, hasCookie } from 'cookies-next';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { SessionProvider, signOut } from 'next-auth/react';
import { useEffect, useRef } from 'react';
import { ThemeProvider } from 'styled-components';

import MyAccountHeader from '@/components/MyAccountHeader/Header';
import type { IProduct } from '@/models/productModel';
import { useAppDispatch } from '@/redux/hooks';
import { getBasketProductList } from '@/redux/Slice/basketSlide';
import { getProductList } from '@/redux/Slice/cupboardSlide';
import BasketHeader from '@/templates/basketHeader';
import Footer from '@/templates/footer';
import Header from '@/templates/header';

import { GlobalStyle } from '../assets/styles/GlobalStyles';
import theme from '../assets/styles/theme';
import { wrapper } from '../redux/store';

config.autoAddCss = false;
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const router = useRouter();
  const pathname = router.pathname.split('/');
  const dispatch = useAppDispatch();
  const isLoaded = useRef<boolean>(null);

  useEffect(() => {
    if (!isLoaded.current)
      if (hasCookie('bas')) {
        const item = getCookie('bas');

        dispatch(
          getBasketProductList(JSON.parse(item as string) as IProduct[])
        );
      }
    if (hasCookie('cupboardItem')) {
      const item = getCookie('cupboardItem');

      dispatch(getProductList(JSON.parse(item as string) as IProduct[]));
    }
    isLoaded.current = true;
  }, []);
  useEffect(() => {
    if (session && session.error === 'RefreshAccessTokenError') {
      signOut();
    }
  }, [session]);
  return (
    <>
      <SessionProvider refetchInterval={10} session={session}>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          {pathname[1] !== 'basket' ? <Header /> : <BasketHeader />}
          {pathname[1] === 'myAccount' ? (
            <MyAccountHeader>
              <Component {...pageProps} />
            </MyAccountHeader>
          ) : (
            <Component {...pageProps} />
          )}
          {pathname[1] !== 'basket' && <Footer />}
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}
export default wrapper.withRedux(MyApp);
