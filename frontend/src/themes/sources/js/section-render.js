import AccordionSection from '../../components/accordion.js'
import BannerSection from '../../components/banner.js'
import ChapterSection from '../../components/chapter-teaser.js'
import ImagesSection from '../../components/images-component.js'
import LargeBulletListSection from '../../components/large-bullet-list.js'
import MediaAndTextSection from '../../components/text-media.js'
import NewsTeaserSection from '../../components/news-teaser.js'
import WysiwigSection from './document-renderer.js'

export default function sectionRender(section) {
    
    switch (section.sectionType) {
      case 'accordion':
        return <AccordionSection section={section} />;
      case 'banner':
        return <BannerSection section={section} />;
      case 'chapterTown':
        return <ChapterSection section={section} />;
      case 'images':
        return <ImagesSection section={section} />;
      case 'largebulletlist':
        return <LargeBulletListSection section={section} />;
      case 'media and text':
        return <MediaAndTextSection section={section} />;
      case 'news teaser':
        return <NewsTeaserSection section={section} />;
      case 'resources':
        return <ResourcesSection section={section} />; // not yet! 
      case 'wysiwig':
        return <WysiwigSection section={section} />;
      default:
        return null;
    }
}
