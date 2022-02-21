import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { AppProps } from 'next/app';
import NavBar from "components/NavBar";
import BottomBar from "components/BottomBar";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <SessionProvider>
            <NavBar />
            <br />
            <Component {...pageProps} />
            <BottomBar />
        </SessionProvider>
    );
}

export default MyApp;

