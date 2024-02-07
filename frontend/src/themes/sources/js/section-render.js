import AccordionSection from '../../components/accordion.js'
import BannerSection from '../../components/banner.js'
import ChapterSection from '../../components/chapter-teaser.js'
import ImagesSection from '../../components/images-component.js'
import LargeBulletListSection from '../../components/large-bullet-list.js'
import MediaAndTextSection from '../../components/text-media.js'
import NewsTeaserSection from '../../components/news-teaser.js'
import DocumentRenderer from './document-renderer.js'

export default function sectionRender({section}) {

  console.log("sec content:", section)

    switch (section.sectionType) {
      case 'ACCORDION':
        return <AccordionSection content={section} />;
      case 'banner':
        return <BannerSection section={section} />; // doesnt work!
      case 'chapterTown':
        return <ChapterSection section={section} />; // doesnt work!
      case 'images':
        return <ImagesSection section={section} />; // doesnt work!
      case 'largebulletlist':
        return <LargeBulletListSection section={section} />; // doesnt work!
      case 'media and text':
        return <MediaAndTextSection section={section} />; // doesnt work!
      case 'news teaser':
        return <NewsTeaserSection section={section} />; // doesnt work!
      case 'resources':
        return <ResourcesSection section={section} />; // doesnt work!
      case 'WYSIWYG':
        return <DocumentRenderer content={section.preamble} />;
      default:
        return null;
    }
}
