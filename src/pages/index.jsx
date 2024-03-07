import React from 'react';
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import { fetchMainMenuData, fetchFooterMenuData, fetchChapterSlugData, fetchFrontPageData } from '../graphql'
import '../themes/sources/scss/app.scss'


export default function Hero(props) {

    const frontPageData = props.frontPageData.frontPage
    console.log(frontPageData, frontPageData.heroPreamble.document[0].children[0].text)

    return (
        <div className='site-container'>
            <div className='site-container__top'>
                <Navbar data={props.navMenuData} />
                <main className='site-content'>
                    <h1>{frontPageData.heroTitle}</h1>
                    <h4>{frontPageData.heroPreamble.document[0].children[0].text}</h4>
                    <video width="320" height="240" controls preload="none">
                        <source src={frontPageData.heroVideo.url} type="video/mp4" />
                        <track
                            src="/path/to/captions.vtt"
                            kind="subtitles"
                            srcLang="en"
                            label="English"
                        />
                        Your browser does not support the video tag.
                    </video>
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