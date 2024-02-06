import { gql } from '@apollo/client';
import client from '../../apollo-client.js';
import SectionRender from '../../themes/sources/js/section-render.js'

export default function MyApp({ chapters }) {

  console.log(chapters);  

  return (
    <div>
      <h1>{chapters.slug}</h1>
      <h1>{chapters.chapterLanguage}</h1>
      <h1>{chapters.status}</h1>
      <h1>{chapters.title}</h1>
      <img src={chapters.heroImage.thumbnailUrl} alt={chapters.heroImage.title} />

      {
        chapters.sections.map(element => {
          <RenderSection section={element} />
        })
      }
    </div>
  );
}

export async function getStaticPaths() {

  const cities = ['/chapters/los-angeles', '/chapters/robertfors'];

  const paths = cities.map((city) => ({
    params: { slug: city },
  }));

  console.log("paths:", paths)

  return {
    paths,
    fallback: 'blocking',
  };
}


export async function getStaticProps({ params }) {

  console.log("params:", params.slug)

  const { data } = await client.query({
    query: gql`
      query Query($where: ChapterWhereInput!) {
        chapters(where: $where) {
          slug
          chapterLanguage
          status
          title
          heroImage
          sections
          preamble {
            document
          }
        }
      }
    `,
    variables: {
      where: {
        slug: {
          contains: "/chapters/los-angeles"
        }
      }
    }
  });

  return {
    props: {
      chapters: data.chapters[0],
    },
  };
}
