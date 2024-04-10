import React, { useState } from 'react';
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import { fetchMainMenuData, fetchFooterMenuData, fetchGetPageBySlugData, fetchGetAllCases} from '../graphql'
import SectionRender from '../themes/sources/js/section-renderer'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { DocumentRenderer } from '@keystone-6/document-renderer';
import PrimaryButton from '../themes/components/buttons/primary-button';
import SecondaryButton from '../themes/components/buttons/secondary-button';
import RootLayout from '../app/layout'
import CaseCard from '../themes/components/case-card'


export default function SlugPage(props) {
    const { resolvedUrl } = props;
    console.log(props)
    //console.log("([slug].jsx) :", props.allCasesData, props.resolvedUrl) // remove this later! 

    let title;
    switch (resolvedUrl) {
        case '/cases':
            title = 'Cases';
            break;
        default:
            title = props.pageData ? props.pageData.title : 'Default Title';
    }
    if (!props.navMenuData || (!props.pageData && !props.allCasesData)) { // add footerMenuData here please!
        return notFound();
    }
    //Function to decide what main content to render
    const RenderMainContent = () => {
        if (props.pageData) {
            return RenderPageDataContent(props.pageData);
        } else if (props.allCasesData) {
            return RenderAllCasesContent(props.allCasesData, title);
        } 

        return <div>Default Content</div>;
    };

    return (

        <RootLayout navMenuData={props.navMenuData} footerMenuData={null} tabTitle={title} resolvedUrl={props.resolvedUrl} language="en_GB">
            {RenderMainContent()}
        </RootLayout >
    );
}

function RenderPageDataContent(pageData) {
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

function RenderAllCasesContent(allCasesData, title) {
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

async function fetchMenuData() {
    const navMenuData = await fetchMainMenuData();
    const footerMenuData = await fetchFooterMenuData();
    return { navMenuData, footerMenuData };
}

export async function getServerSideProps({ resolvedUrl }) {
    try {
        const { navMenuData, footerMenuData } = await fetchMenuData();

        let specificData;
        switch (resolvedUrl) {
           
            case '/cases':
                specificData = { allCasesData: await fetchGetAllCases() };
                break;
            default:
                specificData = { pageData: await fetchGetPageBySlugData(resolvedUrl) };
        }
        console.log(specificData)
        return { props: { navMenuData, footerMenuData, resolvedUrl, ...specificData } };

    } catch (error) {
        console.error("([slug].jsx) Error fetching data:", error);
        return { props: { error: error.message } };
    }
}
