import React from 'react';
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import { fetchMainMenuData, fetchFooterMenuData } from '../graphql'
import '../themes/sources/scss/app.scss'

export default function Chapters(props) {

    console.log("props..", props)

    return (    
        <div>
            <Navbar data={props.navMenuData} />
            <h1>chapters page</h1>
            <Footer data={props.navMenuData} />
        </div>
    );
}

export async function getStaticProps() {
    try {
        const navMenuData = await fetchMainMenuData();
        const footerMenuData = await fetchFooterMenuData();
        return { props: { navMenuData: navMenuData, footerMenuData: footerMenuData } };
    } catch (error) {
        console.error("(pages/chapters.jsx) Error fetching data:", error);
        return { notFound: true };
    }
}