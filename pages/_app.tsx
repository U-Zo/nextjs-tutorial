import '../styles/globals.css';

import { AppProps } from 'next/app';

import Responsive from '../components/layout/Responsive';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Responsive>
      <Component {...pageProps} />
    </Responsive>
  );
};

export default MyApp;
