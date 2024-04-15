import {
  fetchCaseItemBySlug,
  fetchMainMenuData,
  fetchFooterMenuData,
} from '../../graphql';
import SectionRenderer from '../../themes/sources/js/section-renderer.js';
import { DocumentRenderer } from '@keystone-6/document-renderer';
import ResourcesSection from '../../themes/components/resource-section.jsx';
import RootLayout from '../../app/layout.jsx';

export default function CasesPage(props) {
  return (
    <>
      <RootLayout
        navMenuData={props.navMenuData}
        footerMenuData={null}
        tabTitle={props.cases.title}
        resolvedUrl={props.resolvedUrl}
        language='en_GB'
      >
        <main className='flex flex-column container-cases'>
          <div className='title-container'>
            <h4 className='sub-heading-m case'>CASE</h4>
            <h1 className='heading-1'>{props.cases[0].title}</h1>
            <DocumentRenderer document={props.cases[0].preamble?.document} />
          </div>
          <div className='flex flex-column flex-align-center'>
            {props.cases.sections &&
              props.cases[0].sections.map((section, index) => (
                <div key={index} className='renderer'>
                  <SectionRenderer section={section} />
                </div>
              ))}
            <div className='renderer'>
              {props.cases[0].resources.length > 0 ? (
                <ResourcesSection
                  resources={props.cases[0].resources}
                  title={props.cases[0].resourcesTitle}
                  preamble={props.cases[0].resourcesPreamble}
                />
              ) : null}
            </div>
          </div>
        </main>
      </RootLayout>
    </>
  );
}

export async function getServerSideProps({ resolvedUrl }) {
  try {
    const cases = await fetchCaseItemBySlug(resolvedUrl);
    const navMenuData = await fetchMainMenuData();
    const footerMenuData = await fetchFooterMenuData();
    if (!cases) {
      return null;
    }

    return { props: { cases, navMenuData, footerMenuData, resolvedUrl } };
  } catch (error) {
    console.error('(cases/[slug].jsx) Error fetching data:', error);
    return null;
  }
}
