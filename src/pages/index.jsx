import React from 'react';
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import { fetchMainMenuData, fetchFooterMenuData, fetchFrontPageData } from '../graphql'
import HeroComponent from '../themes/components/hero-frontpage'
import MetaHeader from '../components/meta-header'
import SectionRenderer from '../themes/sources/js/section-renderer';
import '../themes/sources/scss/app.scss'

export default function FrontPage(props) {

    console.log(props)

    return (
        <>
            <MetaHeader title={props.frontPageData.title ? props.frontPageData.title : null} resolvedUrl={props.resolvedUrl} language="en" />

            <div className='site-container'>
                <div className='site-container__top'>
                    <Navbar data={props.navMenuData} />
                    <main className='site-content flex flex-column flex-align-center flex-justify-start'>

                        { props.frontPageData ? (<HeroComponent prop={props.frontPageData} />) : null }

                        {props.frontPageData.sections && props.frontPageData.sections.map((section, index) => (
                            <section key={index} className='flex flex-column flex-align-center flex-justify-center'>
                                <SectionRenderer key={index} section={section} />
                            </section>
                        ))}

                    </main>
                </div>

                <Footer data={props.navMenuData} /> { /* please change to footerMenuData */}
            </div>
        </>
    );
}

export async function getServerSideProps({ resolvedUrl }) {
    try {
        const frontPageData = await fetchFrontPageData();
        const navMenuData = await fetchMainMenuData();
        const footerMenuData = await fetchFooterMenuData();
        return { props: { navMenuData, footerMenuData, frontPageData, resolvedUrl } };
    } catch (error) {
        console.error("(index.jsx) Error fetching data:", error);
        return { notFound: true };
    }
}