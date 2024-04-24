import React from 'react';

import { fetchGetAllCases } from '../../graphql';
import CaseCard from '../../themes/components/case-card';

import { useQuery } from '@apollo/client';
import { initializeApollo, addApolloState } from '../../data/apollo-client';
import { CASES_ALL_DESC_QUERY } from '../../data/queries';

export default function RenderAllCasesContent() {
  const { loading, error, data } = useQuery(CASES_ALL_DESC_QUERY);
  const title = 'Cases';

  return (
    <main className='site-content flex flex-column flex-align-center flex-justify-start'>
      <h1 className='heading-background'>{title}</h1>
      {data.cases &&
        data.cases.map((caseData) => {
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

export async function getServerSideProps({ resolvedUrl }) {
  const apolloClient = initializeApollo();
  try {
    //const { navMenuData, footerMenuData } = await fetchMenuData();
    await apolloClient.query({
      query: CASES_ALL_DESC_QUERY,
    });
    // const allCasesData = await fetchGetAllCases();
    // return { props: { resolvedUrl, allCasesData } };
    return addApolloState(apolloClient, {
      props: {},
    });
  } catch (error) {
    console.error('([slug].jsx) Error fetching data:', error);
    return { props: { error: error.message } };
  }
}
