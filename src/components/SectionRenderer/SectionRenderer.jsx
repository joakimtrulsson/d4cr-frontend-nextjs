import AccordionSection from '../Accordion/Accordion.jsx';
import BannerSection from '../Banner/Banner.jsx';
import ChapterSection from '../ChapterTeaser/ChapterTeaser.jsx';
import ImagesSection from '../ImagesComponent/ImagesComponent.jsx';
import LargeBulletListSection from '../LargeBulletList/LargeBulletList.jsx';
import MediaTextSection from '../TextMediaComponent/TextMediaComponent.jsx';
import NewsTeaserSection from '../NewsTeaser/NewsTeaser.jsx';
import PrinciplesSection from '../Principles/Principles.jsx';
import PeopleSection from '../People/People.jsx';
import WYSIWYG from '../Wysiwyg/Wysiwyg.jsx';

export default function SectionRenderer({ section, multipleTextMedia }) {
  switch (section.sectionType) {
    case 'ACCORDION':
      return (
        <section className='flex margin-tb--xxl'>
          <AccordionSection content={section} />
        </section>
      );
    case 'BANNER':
      return (
        <section className='flex margin-tb--xxl'>
          <BannerSection content={section} />
        </section>
      );
    case 'CHAPTERTEASER':
      return (
        <section className='flex full-site-container-width margin-tb--xxl'>
          <ChapterSection content={section} />
        </section>
      );
    case 'IMAGE':
      return (
        <section className='flex margin-tb--xxl'>
          <ImagesSection content={section} />
        </section>
      );
    case 'BULLETLIST':
      return (
        <section className='flex margin-tb--xxl'>
          <LargeBulletListSection content={section} />;
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
          <MediaTextSection content={section} />
        </section>
      );
    case 'NEWSTEASER':
      return (
        <section className='flex margin-tb--xxl'>
          <NewsTeaserSection content={section} />
        </section>
      );
    case 'PRINCIPLES':
      return (
        <section className='flex margin-tb--xxl'>
          <PrinciplesSection content={section} />
        </section>
      );
    // case 'RESOURCES':
    //   return <ResourcesSection content={section} />;
    case 'PEOPLE':
      return (
        <section className='flex margin-tb--xxl'>
          <PeopleSection content={section} />
        </section>
      );

    case 'WYSIWYG':
      return (
        <div className='margin-lr--xxxl max-width-60 margin-tb--xxl'>
          <WYSIWYG content={section.preamble} />
        </div>
      );
    default:
      return null;
  }
}
