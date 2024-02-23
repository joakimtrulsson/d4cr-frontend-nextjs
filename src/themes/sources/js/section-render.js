import AccordionSection from '../../components/accordion.jsx'
import BannerSection from '../../components/banner.jsx'
import ChapterSection from '../../components/chapter-teaser.jsx'
import ImagesSection from '../../components/images-component.jsx'
import LargeBulletListSection from '../../components/large-bullet-list.jsx'
import MediaTextSection from '../../components/text-media-component.jsx'
import NewsTeaserSection from '../../components/news-teaser.jsx'
import PrinciplesSection from '../../components/principles.jsx'
import WYSIWYG from '../../components/wysiwyg.jsx'

export default function sectionRender({ section }) {

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
        return <ResourcesSection content={section} />; // doesnt work!
      case 'WYSIWYG':
        return <WYSIWYG content={section.preamble} />;
      default:
        return null;
    }
}