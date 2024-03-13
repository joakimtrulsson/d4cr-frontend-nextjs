import React from 'react';
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import { fetchMainMenuData, fetchFooterMenuData, fetchGetPageBySlugData } from '../graphql'
import SectionRender from '../themes/sources/js/section-renderer'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { DocumentRenderer } from '@keystone-6/document-renderer';
import PrimaryButton from '../themes/components/buttons/primary-button';
import SecondaryButton from '../themes/components/buttons/secondary-button';
import Head from 'next/head';
import d4crIcon from '../themes/sources/assets/graphics/d4cr_logo@2x.png'
import '../themes/sources/scss/app.scss'

export default function SlugPage(props) {

    console.log(props)

    if (!props.navMenuData && !props.pageData) { // add footerMenuData here please!
        return notFound();
    }

    return (
        <>
            <Head>
                <title>{props.pageData.title}</title>
                <meta name="description" content="designing for children's rights" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                <meta name="og:image" content={d4crIcon}></meta>
             </Head>
            <div className='site-container'>
                <div className='site-container__top'>
                    <Navbar data={props.navMenuData} />
                    <main className='site-content flex flex-column flex-align-center flex-justify-center'>

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

                    </main>
                </div>

                <Footer data={props.navMenuData} /> { /* please change to footerMenuData */}
            </div>
        </>
    );
}

export async function getServerSideProps({ resolvedUrl }) {
    try {

        const pageData = await fetchGetPageBySlugData(resolvedUrl);

        if (!pageData) {
            return null;
        }

        const navMenuData = await fetchMainMenuData();
        const footerMenuData = await fetchFooterMenuData();

        return { props: { navMenuData, footerMenuData, pageData } };

    } catch (error) {
        console.error("([slug].jsx) Error fetching data:", error);
        return null;
    }
}