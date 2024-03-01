import React from 'react';
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import { fetchMainMenuData, fetchFooterMenuData, fetchChapterSlugData } from '../graphql'
import '../themes/sources/scss/app.scss'

export default function Hero(props) {

    return (    
        <div>
            <Navbar data={props.navMenuData} />
            <h1>Hero</h1>
            <Footer data={props.navMenuData} />
        </div>
    );
}

export async function getServerSideProps() {
    try {
        const navMenuData = await fetchMainMenuData();
        const footerMenuData = await fetchFooterMenuData();
        return { props: { navMenuData: navMenuData, footerMenuData: footerMenuData } };
    } catch (error) {
        console.error("(pages/chapters.jsx) Error fetching data:", error);
        return { notFound: true };
    }
}