import '../styles/globals.css';

import App, { AppContext, AppProps } from 'next/app';

import { Provider, signIn, useSession } from 'next-auth/client';
import { ChakraProvider } from '@chakra-ui/react';
import { useEffect } from 'react';

const Auth = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [session, loading] = useSession();
  const isUser = !!session?.user;
  useEffect(() => {
    if (loading) return;
    if (!isUser) signIn();
  }, [isUser, loading]);

  if (isUser) return children;

  return (
    <div>
      <h1>Loading sexo</h1>
    </div>
  );
};

const Application = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <Provider session={pageProps.session}>
      <Auth>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </Auth>
    </Provider>
  );
};

Application.getInitialProps = async (appContext: AppContext) => ({
  ...(await App.getInitialProps(appContext)),
});

export default Application;
