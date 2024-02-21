import AccordionSection from '../../components/accordion.js'
import BannerSection from '../../components/banner.js'
import ChapterSection from '../../components/chapter-teaser.js'
import ImagesSection from '../../components/images-component.js'
import LargeBulletListSection from '../../components/large-bullet-list.js'
import MediaTextSection from '../../components/text-media-component.js'
import NewsTeaserSection from '../../components/news-teaser.js'
import WYSIWYG from '../../components/wysiwyg.js'

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
        return <PrinciplesSection content={section} />; // doesnt work!
      case 'RESOURCES':
        return <ResourcesSection content={section} />; // doesnt work!
      case 'WYSIWYG':
        return <WYSIWYG content={section.preamble} />;
      default:
        return null;
    }
}
