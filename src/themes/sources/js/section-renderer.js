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
      return <AccordionSection content={section} />;
    case 'BANNER':
      return <BannerSection content={section} />;
    case 'CHAPTERTEASER':
      return <ChapterSection content={section} />;
    case 'IMAGE':
      return <ImagesSection content={section} />;
    case 'BULLETLIST':
      return <LargeBulletListSection content={section} />;
    case 'MEDIATEXT':
      return <MediaTextSection content={section} />;
    case 'NEWSTEASER':
      return <NewsTeaserSection content={section} />;
    case 'PRINCIPLES':
      return <PrinciplesSection content={section} />;
    case 'RESOURCES':
      return <ResourcesSection content={section} />;
    case 'PEOPLE':
      return <PeopleSection content={section} />;

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
