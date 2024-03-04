import Link from 'next/link'
import Image from 'next/image'
import getLanguageName from '../../themes/sources/js/language-code.js'
import SectionRender from '../../themes/sources/js/section-render.js';
import AnimationRight from '../../themes/sources/assets/graphics/animation.gif'
import AnimationLeft from '../../themes/sources/assets/graphics/animation-2.gif'
import { DocumentRenderer } from '@keystone-6/document-renderer';
import styles from '../../themes/sources/scss/app.scss'
import NavBar from '../../components/navbar.jsx'
import Footer from '../../components/footer.jsx'
import { fetchChapterSlugData, fetchMainMenuData, fetchFooterMenuData } from '../../graphql.js'

export default function SlugPage({ navMenuData, footerMenuData, chapters  }) {

  // Get current chapter
  const currentLanguage = {
    chapterLanguage: chapters.chapterLanguage,
    slug: chapters.slug
  };

  // Get the translated chapters
  const chapterLanguages = chapters.translatedChapters
    .filter(chapter => chapter.status === "published" && chapter.chapterLanguage && chapter.slug)
    .map(chapter => ({ chapterLanguage: chapter.chapterLanguage, slug: chapter.slug }));

  // Check if the current chapter is not in the array, and if it isn't, then add it
  if (currentLanguage && !chapterLanguages.some(chapter =>
    chapter.chapterLanguage === currentLanguage.chapterLanguage &&
    chapter.slug === currentLanguage.slug)) {
    chapterLanguages.push(currentLanguage);
  }

  // Sort the chapterLanguages array alphabetically based on chapterLanguage
  chapterLanguages.sort((a, b) => a.chapterLanguage.localeCompare(b.chapterLanguage)); // 

  return (
    <>
      <NavBar data={navMenuData} />
      <div className={`${styles.container} flex flex-column flex-align-center`}>

        {chapterLanguages.length > 1 && ( // add buttons to the translated chapters if exists
          <div className='language-tabs margin-tb--s'>

            <div className='animation-background-right'>
              <Image src={AnimationRight} alt="Animated GIF" />
            </div>

            <div className='animation-background-left'>
              <Image src={AnimationLeft} alt="Animated GIF"  />
            </div>

            {chapterLanguages.map((chapter, index) => (
              <Link href={chapter.slug} key={index}>
                <button
                  className={`lang-btn ${index === chapterLanguages.length - 1 ? 'lang-btn-right' : ''}
                  ${index === 0 ? 'lang-btn-left' : ''}
                  ${chapter.slug === currentLanguage.slug ? 'lang-btn-active' : ''}`}>
                  {getLanguageName(chapter.chapterLanguage)}
                </button>
              </Link>
            ))}

          </div>
        )}

        {chapters.heroImage.url && ( // show hero image if exists
          <div className='hero margin-t--s borderradius--xxxs'>
              <Image className='center-image' src={chapters.heroImage.url} alt={chapters.heroImage.alt} fill={true} />
          </div>
        )}

        <p className='sub-heading-m color-yellow-600 margin-t--s'>D4CR PRESENTS</p>

        {chapters.title && <h1 className='heading-background margin-t--zero'>{chapters.title}</h1>}

        <div className='max-width-45 text-align-center'>
          {chapters.preamble.document && <DocumentRenderer document={chapters.preamble.document} />}
        </div>


        {chapters.sections && chapters.sections.map((section, index) => ( // Render all this chapter's sections
          <div key={index} className='margin-tb--xs'>
            <SectionRender section={section} />
          </div>
        ))}
      </div>
      <Footer data={navMenuData} /> { /* change to footerMenuData later */}
    </>
  )
}

export async function getServerSideProps({ resolvedUrl }) {
  try {

    const chapters = await fetchChapterSlugData(resolvedUrl);

    if (chapters === null) {
      return {
        notFound: true,
      };
    }

    const navMenuData = await fetchMainMenuData();
    const footerMenuData = await fetchFooterMenuData();

    return { props: { navMenuData, footerMenuData, chapters } };


  } catch (error) {

    console.error("(chapters/[slug].jsx) Error fetching data:", error)
    return {
      notFound: true,
    }
  }
}