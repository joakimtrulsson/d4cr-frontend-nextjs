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

export default function SectionRenderer({ section }) {
  switch (section.sectionType) {
    case 'ACCORDION':
      return (
        <section className='flex'>
          <AccordionSection content={section} />
        </section>
      );
    case 'BANNER':
      return (
        <section className='flex'>
          <BannerSection content={section} />
        </section>
      );
    case 'CHAPTERTEASER':
      return (
        <section className='flex full-site-container-width'>
          <ChapterSection content={section} />
        </section>
      );
    case 'IMAGE':
      return (
        <section className='flex'>
          <ImagesSection content={section} />
        </section>
      );
    case 'BULLETLIST':
      return <LargeBulletListSection content={section} />;
    case 'MEDIATEXT':
      return (
        <section className='flex full-site-container-width'>
          <MediaTextSection content={section} />
        </section>
      );
    case 'NEWSTEASER':
      return (
        <section className='flex'>
          <NewsTeaserSection content={section} />
        </section>
      );
    case 'PRINCIPLES':
      return (
        <section className='flex'>
          <PrinciplesSection content={section} />
        </section>
      );
    // case 'RESOURCES':
    //   return <ResourcesSection content={section} />;
    case 'PEOPLE':
      return (
        <section className='flex'>
          <PeopleSection content={section} />
        </section>
      );

    case 'WYSIWYG':
      return (
        <div className='margin-lr--xxxl max-width-60 margin-tb--l'>
          <WYSIWYG content={section.preamble} />
        </div>
      );
    default:
      return null;
  }
}
