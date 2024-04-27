import AccordionSection from '../../components/accordion.jsx';
import BannerSection from '../../../components/banner.jsx';
import ChapterSection from '../../components/chapter-teaser.jsx';
import ImagesSection from '../../components/images-component.jsx';
import LargeBulletListSection from '../../components/large-bullet-list.jsx';
import MediaTextSection from '../../components/text-media-component.jsx';
import NewsTeaserSection from '../../components/news-teaser.jsx';
import PrinciplesSection from '../../components/principles.jsx';
import ResourcesSection from '../../components/resource-section.jsx';
// import SteeringGroup from '../../../components/steering-group.jsx';
import PeopleSection from '../../components/People.jsx';
import WYSIWYG from '../../components/wysiwyg.jsx';

export default function sectionRenderer({ section }) {
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
