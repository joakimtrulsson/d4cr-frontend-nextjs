import React from 'react';
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import { fetchMainMenuData, fetchFooterMenuData } from '../graphql'
import '../themes/sources/scss/app.scss'

export default function Chapters(props) {

    return (
        <div className='site-container'>
            <div className='site-container__top'>
                <Navbar data={props.navMenuData} />
                <main className='site-content'>
                    <h1>Chapters.. Sweet Chapters</h1>
                </main>
            </div>
            
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