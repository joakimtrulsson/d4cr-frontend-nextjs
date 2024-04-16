import Link from 'next/link';
import Image from 'next/image';
import getLanguageName from '../../themes/sources/js/language-code.js';
import SectionRender from '../../themes/sources/js/section-renderer.js';
import AnimationRight from '../../themes/sources/assets/graphics/animation.gif';
import AnimationLeft from '../../themes/sources/assets/graphics/animation-2.gif';
import RootLayout from '../../app/layout.jsx';
import { DocumentRenderer } from '@keystone-6/document-renderer';
import {
    fetchAllNews

} from '../../graphql.js';

export default function Test({
    news
}) {
    console.log(news)

    return (
        <>hej</>
    )
}

export async function getServerSideProps({ resolvedUrl }) {
    let news = null
    try {
        const result = await fetchAllNews()
        if (result.ok) {
            const data =await result.json();
            news = data}
            else { console.error('Failed to fetch news categories:', result.status);
        }
       
    } catch (error) {
        console.error('(chapters/[slug].jsx) Error fetching data:', error);

    }
    if (news === undefined) {
        news = null; // Use null instead of undefined
    }
    return { props: { news } };
}
