// pages/_app.tsx

import store from '@/redux/store';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';

function MyApp({ Component, pageProps }:AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
