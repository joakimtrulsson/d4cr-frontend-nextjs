import {
  Accordion,
  Banner,
  ChapterTeaser,
  ImagesComponent,
  LargeBulletList,
  TextMediaComponent,
  NewsTeaser,
  Principles,
  People,
  WYSIWYG,
} from '../index.js';

export default function SectionRenderer({ section, multipleTextMedia }) {
  switch (section.sectionType) {
    case 'ACCORDION':
      return (
        <section className='section flex margin-tb--xxl'>
          <Accordion content={section} />
        </section>
      );
    case 'BANNER':
      return (
        <section className='section  flex margin-tb--xxl'>
          <Banner content={section} />
        </section>
      );
    case 'CHAPTERTEASER':
      return (
        <section className='section flex full-site-container-width margin-tb--xxl'>
          <ChapterTeaser content={section} />
        </section>
      );
    case 'IMAGE':
      return (
        <section className='section flex margin-tb--xxl'>
          <ImagesComponent content={section} />
        </section>
      );
    case 'BULLETLIST':
      return (
        <section className='section flex margin-tb--xxl'>
          <LargeBulletList content={section} />
        </section>
      );
    case 'MEDIATEXT':
      // Bestäm vilken klass som ska läggas till
      let className;
      if (!multipleTextMedia.isConsecutiveMediaText) {
        className = 'margin-tb--xxl';
      } else if (multipleTextMedia.mediaTextGroupCount === 2) {
        className =
          multipleTextMedia.mediaTextGroupIndex === 1 ? 'margin-t--xxl' : 'margin-b--xxl';
      } else if (multipleTextMedia.mediaTextGroupCount > 2) {
        if (multipleTextMedia.mediaTextGroupIndex === 1) {
          className = 'margin-t--xxl';
        } else if (
          multipleTextMedia.mediaTextGroupIndex === multipleTextMedia.mediaTextGroupCount
        ) {
          className = 'margin-b--xxl';
        }
      }

      return (
        <section className={`flex full-site-container-width ${className}`}>
          <TextMediaComponent content={section} />
        </section>
      );
    case 'NEWSTEASER':
      return (
        <section className='section flex margin-tb--xxl'>
          <NewsTeaser content={section} />
        </section>
      );
    case 'PRINCIPLES':
      return (
        <section className='section  flex margin-tb--xxl'>
          <Principles content={section} />
        </section>
      );
    case 'PEOPLE':
      return (
        <section className='section flex margin-tb--xxl'>
          <People content={section} />
        </section>
      );

    case 'WYSIWYG':
      return (
        <div className='section wysiwyg-container max-width-60 margin-tb--xxl'>
          <WYSIWYG content={section.preamble} />
        </div>
      );
    default:
      return null;
  }
}
