import React, { useState } from 'react';
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
import DropdownMenu from '../themes/components/drop-down';

export default function SlugPage(props) {
    const { resolvedUrl } = props;
    //console.log("([slug].jsx) :", props.allCasesData, props.resolvedUrl) // remove this later! 

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
    const RenderMainContent = () => {
        if (props.pageData) {
            return RenderPageDataContent(props.pageData);
        } else if (props.allCasesData) {
            return RenderAllCasesContent(props.allCasesData, title);
        } else if (props.resourcesCat) {
            return RenderResourcesContent(props.resourcesCat);
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
            console.log("caseItems", caseData.caseLink, caseData.id, caseData.quote, caseData.title, caseData.status, caseData);

            const check = caseData.caseLink || null;

            return (
                <CaseCard check={check} link={caseData.caseLink ? caseData.caseLink : caseData.slug} quote={caseData.quote} title={caseData.title} className="flex flex-column" key={caseData.id} />
            );
        })
        }</main>)
}

function RenderResourcesContent(resourcesCat) {
    const [showType, setShowType] = useState('All areas')
    const [currentPage, setCurrentPage] = useState(1);

    //dela upp hela resources array till sina typer
    const groupedByType = resourcesCat.reduce((acc, resource) => {
        const type = resource.resourceType.type;

        if (!acc[type]) {
            acc[type] = [];
        }

        acc[type].push(resource);
        return acc;
    }, {});

    const groupsBtn = Object.entries(groupedByType).map(([type, resources]) => {

        return (<>
            {type !== showType ? (<p key={type} onClick={() => {
                setShowType(type);
                setCurrentPage(1);
            }}>
                {type}

            </p>) : (null)}</>
        )
    })

    let arrayToShow = resourcesCat
    if (showType !== 'All areas') {
        arrayToShow = groupedByType[showType]
    }

    //Bestäm hur många som visas på sidorna mm
    const numberOfCards = arrayToShow.length
    const itemsPerPage = 20;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = arrayToShow.slice(startIndex, endIndex);
    const goToNextPage = () => setCurrentPage((prev) => prev + 1);
    const goToPreviousPage = () => setCurrentPage((prev) => prev - 1);
    const isFirstPage = currentPage === 1;
    const isLastPage = endIndex >= arrayToShow.length;
    const goToPage = (page) => setCurrentPage(page);
    const totalPageCount = Math.ceil(numberOfCards / itemsPerPage);

    return (
        <main className="slug-resources-outer-container flex flex-column flex-align-center">
            <h1 className="heading-background">Supporting resources</h1>

            <DropdownMenu className="margin-tb--m" showType={showType} currentPage={currentPage} groupsBtn={groupsBtn} setShowType={setShowType} setCurrentPage={setCurrentPage} />
            < div className="slug-resources-inner-container  flex flex-row flex-wrap flex-justify-start flex-align-between ">
                {currentItems.map((resource, index) => (

                    <ResourceCard key={index} prop={resource} />

                ))
                }
            </div>
            {arrayToShow.length > 20 ? <div className="pagination-buttons flex flex-row flex-wrap flex-justify-start flex-align-between ">
                <button className="arrow-button" onClick={goToPreviousPage} disabled={isFirstPage}>
                    <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" fill={`${isFirstPage ? '#DEDEDE' : '#FC7C37'}`}>
                        <g transform="translate(320, 0) scale(-1, 1)">
                            <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                        </g>  </svg>
                </button>
                {Array.from({ length: totalPageCount }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => goToPage(index + 1)}
                        className={`page-button ${currentPage === index + 1 ? "active" : ""} heading-4`}
                    >
                        {index + 1}

                    </button>
                ))}
                <button className={`arrow-button`} onClick={goToNextPage} disabled={isLastPage}>
                    <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" fill={`${isLastPage ? '#DEDEDE' : '#FC7C37'}`}>
                        <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                    </svg>
                </button>
            </div> : null}
        </main>)
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
            case '/resources':
                specificData = { resourcesCat: await fetchResourcesCategories() };
                break;
            case '/cases':
                specificData = { allCasesData: await fetchGetAllCases() };
                break;
            default:
                specificData = { pageData: await fetchGetPageBySlugData(resolvedUrl) };
        }

        return { props: { navMenuData, footerMenuData, resolvedUrl, ...specificData } };

    } catch (error) {
        console.error("([slug].jsx) Error fetching data:", error);
        return { props: { error: error.message } };
    }
}
