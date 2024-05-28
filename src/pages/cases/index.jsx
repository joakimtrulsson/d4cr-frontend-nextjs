import React from 'react';

import { CaseCard } from '../../components/index.js';
import { CASES_ALL_DESC_QUERY, initializeApollo } from '../../graphql/index';

export default function RenderAllCasesContent({ caseData }) {
  const title = 'Cases';

  return (
    <main className='site-content flex flex-column flex-align-center flex-justify-center'>
      <h1 className='heading-background'>{title}</h1>
      <div className='cases-container'>
        {caseData &&
          caseData.map((caseData) => {
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
      </div>
    </main>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();
  try {
    const { data } = await apolloClient.query({
      query: CASES_ALL_DESC_QUERY,
    });

    return {
      props: { caseData: data.cases, tabTitle: 'Cases' },
      revalidate: Number(process.env.NEXT_PUBLIC_STATIC_REVALIDATE),
    };
  } catch (error) {
    console.error('([slug].jsx) Error fetching data:', error);
    return { props: { error: error.message } };
  }
}
