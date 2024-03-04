import Head from 'next/head';
import NavBar from '../components/navbar';
import { metadata } from '../data/metadata';
import '../themes/sources/scss/app.scss'

export default function RootLayout({ children }) {
    return (
        <>
            <Head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
            </Head>
            <NavBar data={null} />
            <main>{children}</main>
            {/* <Footer /> */}
        </>
    );
}
