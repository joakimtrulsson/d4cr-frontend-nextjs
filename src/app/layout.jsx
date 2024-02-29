import Head from 'next/head';
import NavBar from '../components/navbar';
import { metadata } from '../data/metadata';

export default function RootLayout({ children }) {
    return (
        <>
            <Head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
                <link rel="stylesheet" href="../themes/sources/scss/app.scss" />
            </Head>
            <NavBar data={null} />
            <main>{children}</main>
            {/* <Footer /> */}
        </>
    );
}
