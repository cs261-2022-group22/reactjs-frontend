import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import 'bootstrap/dist/css/bootstrap.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <SessionProvider>
            <Component {...pageProps} />
        </SessionProvider>
    );
}

export default MyApp;

