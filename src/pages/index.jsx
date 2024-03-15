import React from 'react';
import { fetchMainMenuData, fetchFooterMenuData, fetchFrontPageData } from '../graphql'
import HeroComponent from '../themes/components/hero-frontpage'
import SectionRenderer from '../themes/sources/js/section-renderer';
import RootLayout from '../app/layout';

export default function FrontPage(props) {

    return (
        <RootLayout navMenuData={props.navMenuData} footerMenuData={null} tabTitle={null} resolvedUrl={props.resolvedUrl} language="en_GB">
                    <main className='site-content flex flex-column flex-align-center flex-justify-start'>

                        { props.pageData ? (<HeroComponent prop={props.pageData} />) : null }

                        {props.pageData.sections && props.pageData.sections.map((section, index) => (
                            <section key={index} className='flex flex-column flex-align-center flex-justify-center'>
                                <SectionRenderer key={index} section={section} />
                            </section>
                        ))}

                    </main>
        </RootLayout>
    );
}

export async function getServerSideProps({ resolvedUrl }) {
    try {
        const pageData = await fetchFrontPageData();
        const navMenuData = await fetchMainMenuData();
        const footerMenuData = await fetchFooterMenuData();
        return { props: { navMenuData, footerMenuData, pageData, resolvedUrl } };
    } catch (error) {
        console.error("(index.jsx) Error fetching data:", error);
        return { notFound: true };
    }
}