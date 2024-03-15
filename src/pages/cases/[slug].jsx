
import { fetchCaseItemBySlug, fetchMainMenuData, fetchFooterMenuData } from "../../graphql";
import SectionRenderer from '../../themes/sources/js/section-renderer.js';
import { DocumentRenderer } from '@keystone-6/document-renderer'
import ResourcesSection from '../../themes/components/resource-section.jsx'
import PrinciplesSection from '../../themes/components/principles.jsx'

export default function CasesPage(props) {

    return (
        <RootLayout navMenuData={props.navMenuData}
            footerMenuData={null} 
            tabTitle={props.cases.title}
            resolvedUrl={props.resolvedUrl}
            language="en_GB">

            <main className="flex flex-column container-cases">
                <div className="title-container">
                    <h4 className="sub-heading-m case">CASE</h4>
                    <h1 className="heading-1">{props.cases.title}</h1>
                    < DocumentRenderer document={props.cases.preamble.document} />
                </div>
                <div className="flex flex-column flex-align-center">
                    {props.cases.sections && props.cases.sections.map((section, index) => (
                        <div className="renderer" >
                            <SectionRenderer key={index} section={section} />
                        </div>
                    ))
                    }
                    <div className="renderer">
                        {props.cases.resources.resources.length != 0 ? (<ResourcesSection content={cases.resources} />) : null}
                        {props.cases.principles.groups.length != 0 ? (<PrinciplesSection content={cases.principles} />) : null}
                    </div>
                </div>
            </main >
        </RootLayout>
    )
}

export async function getServerSideProps({ resolvedUrl }) {
    try {

        const cases = await fetchCaseItemBySlug(resolvedUrl);

        if (!cases) {
            return null;
        }

        const navMenuData = await fetchMainMenuData();
        const footerMenuData = await fetchFooterMenuData();

        return { props: { cases, navMenuData, footerMenuData, resolvedUrl } };

    } catch (error) {

        console.error("(cases/[slug].jsx) Error fetching data:", error)
        return null;
    }
}