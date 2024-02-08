import { gql } from '@apollo/client';
import client from '../../apollo-client.js';
import SectionRender from '../../themes/sources/js/section-render.js'

export default function MyApp({ chapters }) {

  console.log("slug: ", chapters);  

  return (
    <div>
      <SectionRender section={chapters.sections[7]} />
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
          contains: "/chapters/robertsfors"
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
