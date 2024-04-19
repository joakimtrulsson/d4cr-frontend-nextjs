import Image from 'next/image'
import SectionRender from '../../themes/sources/js/section-renderer.js';
import RootLayout from '../../app/layout.jsx'
import { fetchGetNewsItemBySlugData, fetchMainMenuData, fetchFooterMenuData } from '../../graphql.js'
import Resources from '../../themes/components/resource-section.jsx';

export default function NewsSlugPage(props) {
    
    if (!props.navMenuData || !props.pageData) { // add footerMenuData here please!
        return notFound();
    }
    let resources
    if (props?.pageData?.resources?.length !== 0) {
        resources = props.pageData.resources
    }
    return (
        <RootLayout navMenuData={props.navMenuData}
            footerMenuData={null}
            tabTitle={props.pageData.title}
            resolvedUrl={props.resolvedUrl}
            language="en_GB">

            <main className='site-content flex flex-column flex-align-center flex-justify-start'>
                {props.pageData.image.url && (

                    <div className='hero-image-large margin-tb--s borderradius--xxxs '>
                        <Image className='center-image'
                            src={props.pageData.image.url}
                            alt={props.pageData.image.altText}
                            fill={true} />
                    </div>
                )}

                {(props.pageData.newsCategory.categoryTitle || props.pageData.title) && <div className='margin-lr--m'>
                    {props.pageData.newsCategory.categoryTitle &&
                        <p className='max-width-60 margin--zero full-width-height color-yellow-600 sub-heading-m'>
                            {props.pageData.newsCategory.categoryTitle}
                        </p>
                    }

                    {props.pageData.title &&
                        <h1 className='max-width-60 margin--zero'>
                            {props.pageData.title}
                        </h1>
                    }
                </div>}

                {props.pageData.sections && props.pageData.sections.map((section, index) => (
                    <SectionRender key={index} section={section} />
                ))}
                {resources ? <Resources
                    resources={resources}
                    title={props?.pageData?.resourcesTitle}
                    preamble={props?.pageData?.resourcesPreamble}
                /> : null}
            </main>
        </RootLayout>
    )
}

export async function getServerSideProps({ resolvedUrl }) {
    try {
        const pageData = await fetchGetNewsItemBySlugData(resolvedUrl);
        const navMenuData = await fetchMainMenuData();
        const footerMenuData = await fetchFooterMenuData();

        return { props: { navMenuData, footerMenuData, pageData } };

    } catch (error) {
        console.error("(news/[slug].jsx) Error fetching data:", error)
        return null;
    }
}