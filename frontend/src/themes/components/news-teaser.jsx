import '../sources/scss/components/news-teaser.scss';
import '../sources/scss/base/utils.scss'
import { gql } from '@apollo/client';
import client from '../../apollo-client.js';
import Animation from '../sources/assets/graphics/animation.gif'
import Image from 'next/image'
import Newscard from './news-card.jsx'
import SecondaryButton from './buttons/secondary-button.jsx'
import WYSIWYG from './wysiwyg.js'

export default function NewsTeaser({ content }) {
















    // const sortedNews = content.news.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);

    // Fetcha news (på detta sätt får vi senaste news)

    return (
        <div className="news-teaser-container animation-background-container flex flex-column flex-justify-center flex-align-center 
        padding-tb--xxl margin-lr--m">

            <div className='animation-background'>
                <Image src={Animation} alt="Animated GIF" />
            </div>

            <div className='text-align-center'>
                <h2 className='margin-t--xxs margin--zero'>{content.title}</h2>
                <WYSIWYG content={content.subHeading} />
            </div>

            <div className='news-card-container full-width-height  margin-tb--s flex flex-row flex-wrap
            flex-justify-center flex-align-center'>

             { /* PRINTOUT NEWS CARDS */}

            </div>

            <div className='button-wrapper margin-tb--s'>
                <a className='no-decoration' href="get-url-from-database">
                    <SecondaryButton title={"SEE ALL"} />
                </a>
            </div>

        </div>
    );
};

/*

{content.selectedNews.map(({category, title, url}, index) => (
                    <div key={index} className="card-wrapper margin--xs">
                        <Newscard type={category} title={title} url={"get-url-from-database"} /> 
                    </div>
                ))}

*/


export async function getServerSideProps({ params }) {
  try {

    const { data } = await client.query({
      query: gql`
        query Query($slug: String!) {
          chapters(where: { slug: { equals: $slug } }) {
            slug
            chapterLanguage
            status
            title
            heroImage
            sections
            }
          }
        }
      `,
      variables: { slug: resolvedUrl }
    });

    if (!data.chapters || data.chapters.length === 0) {
      console.error("Data couldn't be found for slug:", slug);
      return {
        notFound: true,
      }
    }

    return { props: { chapters: data.chapters[0] } }

  } catch (error) {

    console.error("(chapters/[slug].js) Error fetching data:", error)
    return { props: { chapters: null } }
  }
}
