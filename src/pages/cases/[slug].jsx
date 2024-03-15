
import { fetchCaseItemBySlug } from "../../graphql";
import SectionRenderer from '../../themes/sources/js/section-renderer.js';
import '../../themes/sources/scss/app.scss'
import { DocumentRenderer } from '@keystone-6/document-renderer'
import ResourcesSection from '../../themes/components/resource-section.jsx'
import PrinciplesSection from '../../themes/components/principles.jsx'

export default function CaseItem({ cases }) {
    console.log('cases', cases)
    return (
        <main className="flex flex-column container-cases">
            <div className="title-container">
                <h4 className="sub-heading-m case">CASE</h4>
                <h1 className="heading-1">{cases.title}</h1>
                < DocumentRenderer document={cases.preamble.document} />
            </div>
            <div className="flex flex-column flex-align-center">
                {cases.sections && cases.sections.map((section, index) => (
                    <div className="renderer" >
                        <SectionRenderer key={index} section={section} />
                    </div>
                ))
                }
                <div className="renderer">
                    {cases.resources.resources.length != 0 ? (<ResourcesSection content={cases.resources} />) : null}
                    {cases.principles.groups.length != 0 ? (<PrinciplesSection content={cases.principles} />) : null}
                </div>
            </div>

        </main >
    )
}

export async function getServerSideProps({ resolvedUrl }) {
    try {

        const cases = await fetchCaseItemBySlug(resolvedUrl);

        if (!cases) {
            return null;
        }

        console.log(cases)
        return { props: { cases } };


    } catch (error) {

        console.error("(cases/[slug].jsx) Error fetching data:", error)
        return null;
    }
}