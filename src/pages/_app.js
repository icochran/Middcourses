import { Provider } from "next-auth/client";
import SSRProvider from "react-bootstrap/SSRProvider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
      <Provider session={pageProps.session}>
        <Component {...pageProps} />
      </Provider>
    </SSRProvider>
  );
}
  


export default MyApp;
