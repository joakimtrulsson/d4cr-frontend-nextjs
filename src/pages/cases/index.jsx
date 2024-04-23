import React from 'react';

import {

    fetchGetAllCases,
} from '../../graphql';

import CaseCard from '../../themes/components/case-card';

export default function RenderAllCasesContent(props) {
   
    return (
        <main className='site-content flex flex-column flex-align-center flex-justify-start'>
            <h1 className='heading-background'>{props.title}</h1>
            {props.allCasesData &&
                props.allCasesData.map((caseData) => {
                    return (
                        <CaseCard
                            linkType={caseData.linkType}
                            link={caseData.url}
                            quote={caseData.quote}
                            title={caseData.title}
                            className='flex flex-column'
                            key={caseData.id}
                            img={caseData.caseImage?.url}
                        />
                    );
                })}
        </main>
    );
}
// async function fetchMenuData() {
//     const navMenuData = await fetchMainMenuData();
//     const footerMenuData = await fetchFooterMenuData();
//     return { navMenuData, footerMenuData };
// }

export async function getServerSideProps({ resolvedUrl }) {
    try {
        //const { navMenuData, footerMenuData } = await fetchMenuData();
        const allCasesData = await fetchGetAllCases();
        return { props: { resolvedUrl, allCasesData } };
    } catch (error) {
        console.error('([slug].jsx) Error fetching data:', error);
        return { props: { error: error.message } };
    }
}