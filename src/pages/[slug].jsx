import React from 'react';
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import { fetchMainMenuData, fetchFooterMenuData, fetchGetPageBySlugData, fetchGetAllCases, fetchResourcesCategories } from '../graphql'
import SectionRender from '../themes/sources/js/section-renderer'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { DocumentRenderer } from '@keystone-6/document-renderer';
import PrimaryButton from '../themes/components/buttons/primary-button';
import SecondaryButton from '../themes/components/buttons/secondary-button';
import RootLayout from '../app/layout'
import CaseCard from '../themes/components/case-card'
import ResourceCard from '../themes/components/resource-card'


export default function SlugPage(props) {
    const { resolvedUrl } = props;
    console.log("([slug].jsx) :", props.allCasesData, props.resolvedUrl) // remove this later! 

    let title;
    switch (resolvedUrl) {
        case '/cases':
            title = 'Cases';
            break;
        case '/resources':
            title = 'Resources';
            break;
        default:
            title = props.pageData ? props.pageData.title : 'Default Title';
    }
    if (!props.navMenuData || (!props.pageData && !props.allCasesData && !props.resourcesCat)) { // add footerMenuData here please!
        return notFound();
    }
    // Function to decide what main content to render
    const renderMainContent = () => {
        if (props.pageData) {
            return renderPageDataContent(props.pageData);
        } else if (props.allCasesData) {
            return renderAllCasesContent(props.allCasesData, title);
        } else if (props.resourcesCat) {
            return renderResourcesContent(props.resourcesCat);
        }
        // Default or fallback content
        return <div>Default Content</div>;
    };

    return (
        
        <RootLayout navMenuData={props.navMenuData} footerMenuData={null} tabTitle={title} resolvedUrl={props.resolvedUrl} language="en_GB">
            {renderMainContent()}
        </RootLayout >
    );
}

function renderPageDataContent(pageData) {
    return (
        <main className='site-content flex flex-column flex-align-center flex-justify-start'>

            {pageData.title && <h1 className='heading-background'>{pageData.title}</h1>}

            {(pageData.heroPreamble || pageData.ctaOneAnchorText || pageData.ctaTwoUrlAnchorText) && (

                <div className='flex flex-column flex-align-center flex-justify-center margin-b--xl width--m max-width-40 text-align-center'>

                    {pageData.heroPreamble && <DocumentRenderer document={pageData.heroPreamble.document} />}

                    {pageData.ctaOneUrl && pageData.ctaTwoUrlAnchorText &&
                        <nav className='flex flex-row'>
                            {pageData.ctaOneAnchorText && pageData.ctaOneUrl &&
                                <Link href={pageData.ctaOneUrl} passHref className='margin-lr--xxxs'>
                                    <PrimaryButton title={pageData.ctaOneAnchorText} />
                                </Link>
                            }

                            {pageData.ctaTwoUrlAnchorText && pageData.ctaTwoUrl &&
                                <Link href={pageData.ctaTwoUrl} passHref className='no-decoration margin-lr--xxxs'>
                                    <SecondaryButton title={pageData.ctaTwoUrlAnchorText} />
                                </Link>
                            }
                        </nav>
                    }
                </div>
            )}

            {pageData.sections && pageData.sections.map((section, index) => (
                <section key={index} className='flex flex-column flex-align-center flex-justify-center'>
                    <SectionRender key={index} section={section} />
                </section>
            ))}

        </main>)
}

function renderAllCasesContent(allCasesData, title) {
    return (
        <main className='site-content flex flex-column flex-align-center flex-justify-start'><h1 className="heading-background">{title}</h1>{allCasesData && allCasesData.map((caseData) => {
            //fixa link vid external om BE inte ändras
            //console.log("caseItems", caseData.caseLink, caseData.id, caseData.quote, caseData.title, caseData.status, caseData);
            const check = caseData.caseLink || null;

            return (
                <CaseCard check={check} link={caseData.caseLink ? caseData.caseLink : caseData.slug} quote={caseData.quote} title={caseData.title} className="flex flex-column" key={caseData.id} />
            );
        })
        }</main>)
}

function renderResourcesContent(resourcesCat) {
    return (
        <main className="resources-outer-container flex flex-column flex-align-center">
            <h1 className="heading-background">Supporting resources</h1>
            < div className="resources-inner-container flex flex-row flex-wrap flex-justify-start flex-align-between ">
                {resourcesCat.map(resource => (
                    // console.log(resource.title, resource.url, resource.resourceType.type)
                    //sortera och max 20 per sida
                    <ResourceCard prop={resource} />

                ))

                }
            </div>
        </main>)
}


export async function getServerSideProps({ resolvedUrl }) {
    try {
        if (resolvedUrl === '/resources') {
            const resourcesCat = await fetchResourcesCategories();
            const navMenuData = await fetchMainMenuData();
            const footerMenuData = await fetchFooterMenuData();

            return { props: { navMenuData, footerMenuData, resolvedUrl, resourcesCat } };
        }
        else if (resolvedUrl === '/cases') {
            const allCasesData = await fetchGetAllCases();
            const navMenuData = await fetchMainMenuData();
            const footerMenuData = await fetchFooterMenuData();

            return { props: { navMenuData, footerMenuData, resolvedUrl, allCasesData } };
        }

        else {
            const pageData = await fetchGetPageBySlugData(resolvedUrl);
            const navMenuData = await fetchMainMenuData();
            const footerMenuData = await fetchFooterMenuData();
            return { props: { navMenuData, footerMenuData, pageData, resolvedUrl } };

        }

    } catch (error) {
        console.error("([slug].jsx) Error fetching data:", error);
        return null;
    }
}