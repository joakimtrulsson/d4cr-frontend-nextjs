
import { fetchCaseItemBySlug } from "../../graphql";
import SectionRenderer from '../../themes/sources/js/section-renderer.js';

export default function CaseItem({ cases }) {
    console.log('cases', cases)
    return (
        <main>
            <div>
                <h3>CASES</h3>
                <h1>{cases.title}</h1>
                <h2>{cases.preamble.document[0].children[0].text}</h2>
            </div>
            <div>
                {cases.sections.map((section, index) => (
                    <SectionRenderer key={index} section={section} />

                ))
                }
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

        console.error("(chapters/[slug].jsx) Error fetching data:", error)
        return null;
    }
}