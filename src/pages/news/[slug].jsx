import Link from 'next/link'
import Image from 'next/image'
import getLanguageName from '../../themes/sources/js/language-code.js'
import SectionRender from '../../themes/sources/js/section-render.js';
import { DocumentRenderer } from '@keystone-6/document-renderer';
import NavBar from '../../components/navbar.jsx'
import Footer from '../../components/footer.jsx'
import { fetchGetNewsItemBySlugData, fetchMainMenuData, fetchFooterMenuData } from '../../graphql.js'
import '../../themes/sources/scss/app.scss'


export default function SlugPage(props) {

    console.log(props.newsData)

    return (
        <div className='site-container'>
            <div className='site-container__top'>
                <NavBar data={props.navMenuData} />
                <main className='site-content flex flex-column flex-align-center'>

                    {props.newsData.image.url && <Image className='center-image' href={props.newsData.image.url} alt={props.newsData.image.altText} fill={true} />}

                    {props.newsData.newsCategory.categoryTitle &&
                        <p className='margin--zero full-width-height max-width-60 color-yellow-600 sub-heading-m'>{props.newsData.newsCategory.categoryTitle}</p>
                    }

                    {props.newsData.title &&
                        <h1 className='max-width-60 margin--zero'>{props.newsData.title}</h1>
                    }


                    {props.newsData.sections && props.newsData.sections.map((section, index) => (

                        <SectionRender key={index} section={section} />

                    )
                    )}

                </main>
            </div>

            <Footer data={props.navMenuData} /> { /* please change to footerMenuData later when backend is working */}
        </div>
    )
}

export async function getServerSideProps({ resolvedUrl }) {
    try {

        const newsData = await fetchGetNewsItemBySlugData(resolvedUrl);

        if (!newsData) {
            return null;
        }

        const navMenuData = await fetchMainMenuData();
        const footerMenuData = await fetchFooterMenuData();

        return { props: { navMenuData, footerMenuData, newsData } };


    } catch (error) {

        console.error("(news/[slug].jsx) Error fetching data:", error)
        return null;
    }
}