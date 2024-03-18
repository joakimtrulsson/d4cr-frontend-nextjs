import React from 'react';
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import { fetchMainMenuData, fetchFooterMenuData, fetchGetPageBySlugData, fetchGetAllCases } from '../graphql'
import SectionRender from '../themes/sources/js/section-renderer'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { DocumentRenderer } from '@keystone-6/document-renderer';
import PrimaryButton from '../themes/components/buttons/primary-button';
import SecondaryButton from '../themes/components/buttons/secondary-button';
import RootLayout from '../app/layout'
import CaseCard from '../themes/components/case-card'
//jobba vidare med allcases
export default function SlugPage(props) {

    console.log("([slug].jsx) :", props) // remove this later! 
    const title = 'Cases' || props.pageData.title;
    if (!props.navMenuData || (!props.pageData && !props.allCasesData)) { // add footerMenuData here please!
        return notFound();
    }

    return (
        <RootLayout navMenuData={props.navMenuData} footerMenuData={null} tabTitle={title} resolvedUrl={props.resolvedUrl} language="en_GB">

            {props.pageData ? (<main className='site-content flex flex-column flex-align-center flex-justify-start'>

                {props.pageData.title && <h1 className='heading-background'>{props.pageData.title}</h1>}

                {(props.pageData.heroPreamble || props.pageData.ctaOneAnchorText || props.pageData.ctaTwoUrlAnchorText) && (

                    <div className='flex flex-column flex-align-center flex-justify-center margin-b--xl width--m max-width-40 text-align-center'>

                        {props.pageData.heroPreamble && <DocumentRenderer document={props.pageData.heroPreamble.document} />}

                        {props.pageData.ctaOneUrl && props.pageData.ctaTwoUrlAnchorText &&
                            <nav className='flex flex-row'>
                                {props.pageData.ctaOneAnchorText && props.pageData.ctaOneUrl &&
                                    <Link href={props.pageData.ctaOneUrl} passHref className='margin-lr--xxxs'>
                                        <PrimaryButton title={props.pageData.ctaOneAnchorText} />
                                    </Link>
                                }

                                {props.pageData.ctaTwoUrlAnchorText && props.pageData.ctaTwoUrl &&
                                    <Link href={props.pageData.ctaTwoUrl} passHref className='no-decoration margin-lr--xxxs'>
                                        <SecondaryButton title={props.pageData.ctaTwoUrlAnchorText} />
                                    </Link>
                                }
                            </nav>
                        }
                    </div>
                )}

                {props.pageData.sections && props.pageData.sections.map((section, index) => (
                    <section key={index} className='flex flex-column flex-align-center flex-justify-center'>
                        <SectionRender key={index} section={section} />
                    </section>
                ))}





            </main>) : (<main className='site-content flex flex-column flex-align-center flex-justify-start'><h1>Cases</h1>{props.allCasesData && props.allCasesData.map((caseData) => {

                console.log("caseItems", caseData.caseLink, caseData.id, caseData.quote, caseData.title, caseData.status, caseData);
                return (
                    <CaseCard link={caseData.caseLink} quote={caseData.quote} title={caseData.title} className="flex flex-column" key={caseData.id} />
                );
            })
            }</main>)}
        </RootLayout >
    );
}

export async function getServerSideProps({ resolvedUrl }) {
    try {
        if (resolvedUrl === '/cases') {
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