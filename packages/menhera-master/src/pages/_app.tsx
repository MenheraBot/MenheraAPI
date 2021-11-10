import App, { AppContext, AppProps } from 'next/app';

import { Provider, signIn, useSession } from 'next-auth/client';
import { useEffect } from 'react';

const Auth = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [session, loading] = useSession();
  const isUser = !!session?.user;
  useEffect(() => {
    if (loading) return;
    if (!isUser) signIn();
  }, [isUser, loading]);

  if (isUser) {
    console.log(session.user);
    return children;
  }

  return <div>HUT UP AND TAKE MY MONEY</div>;
};

const Application = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <Provider session={pageProps.session}>
      <Auth>
        <Component {...pageProps} />
      </Auth>
    </Provider>
  );
};

Application.getInitialProps = async (appContext: AppContext) => ({
  ...(await App.getInitialProps(appContext)),
});

export default Application;
