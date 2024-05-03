import React from 'react';
import CaseCard from '../../components/CaseCard/CaseCard';
import { initializeApollo, addApolloState } from '../../graphql/apolloClient';
import { CASES_ALL_DESC_QUERY } from '../../graphql/queries';

export default function RenderAllCasesContent({ caseData }) {
  const title = 'Cases';

  return (
    <main className='site-content  flex flex-column flex-align-center flex-justify-start'>
      <h1 className='heading-background'>{title}</h1>
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
    </main>
  );
}

export async function getServerSideProps({ resolvedUrl }) {
  const apolloClient = initializeApollo();
  try {
    const { data } = await apolloClient.query({
      query: CASES_ALL_DESC_QUERY,
    });

    return addApolloState(apolloClient, {
      props: { caseData: data.cases, tabTitle: 'Cases' },
    });
  } catch (error) {
    console.error('([slug].jsx) Error fetching data:', error);
    return { props: { error: error.message } };
  }
}
