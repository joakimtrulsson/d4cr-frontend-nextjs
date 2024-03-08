import React from 'react';
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import { fetchMainMenuData, fetchFooterMenuData, fetchChapterSlugData, fetchFrontPageData } from '../graphql'
import '../themes/sources/scss/app.scss'
import HeroComponent from '../themes/components/hero-frontpage'


export default function FrontPage(props) {
    const frontPageData = props.frontPageData && props.frontPageData.frontPage ? props.frontPageData.frontPage : null;

    //responsive design
    return (
        <div className='site-container'>
            <div className='site-container__top'>
                <Navbar data={props.navMenuData} />
                <main className='site-content'>

                    {frontPageData ? (<HeroComponent prop={frontPageData} />) : null}
                </main>
            </div>

            <Footer data={props.navMenuData} />
        </div>
    );
}

export async function getServerSideProps() {
    try {
        const FrontPageData = await fetchFrontPageData();
        const navMenuData = await fetchMainMenuData();
        const footerMenuData = await fetchFooterMenuData();
        return { props: { navMenuData: navMenuData, footerMenuData: footerMenuData, frontPageData: FrontPageData } };
    } catch (error) {
        console.error("(pages/chapters.jsx) Error fetching data:", error);
        return { notFound: true };
    }
}