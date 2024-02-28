import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import NavBar from '../components/navbar';
import { metadata } from '../data/metadata';
import { fetchMainMenuData } from '../graphql';

export default function RootLayout({ children }) {

    const [navigationData, setNavigationData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("(RootLayout) Fetching data...");
                const data = await fetchMainMenuData();
                console.log("(RootLayout) Data fetched successfully:", data);
                setNavigationData(data);
            } catch (error) {
                console.error("(RootLayout) Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);

    return (
        <html lang="en">
            <Head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
                <link rel="stylesheet" href="../themes/sources/scss/app.scss" />
            </Head>
            <body>
                <NavBar data={navigationData} />
                <main>{children}</main>
                {/* <Footer /> */}
            </body>
        </html>
    );
}
