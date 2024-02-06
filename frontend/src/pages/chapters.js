import Accordion from '../themes/components/accordion.js'
import Banner from '../themes/components/banner.js'
import ChapterTeaser from '../themes/components/chapter-teaser.js'
import BulletList from '../themes/components/large-bullet-list.js'
import '../themes/sources/scss/base/utils.scss'


export default function AllSectionsPage() {

  const title = "About local chapters"
  const bannerTitle = "Join D4CR"
  const bannerText = "There are multiple ways to get involved. A good start is to join our Slack channel and we can talk more about the next step together."

  
  return (
    <main className='flex flex-column flex-justify-center flex-align-center'>
      <h1>{title}</h1>
      <ChapterTeaser />
      <Accordion />
      <BulletList />
      <Banner title={bannerTitle} text={bannerText} />
    </main>
  )
}

