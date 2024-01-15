import Navbar from '../components/navbar'
import Footer from '../components/footer'
import ChapterTeaser from '../components/chapter-teaser'
import '../styles/home.scss'

export default function Home() {
  return (
    <main className='main'>
      <Navbar />
      <ChapterTeaser />
      { /* <Footer /> */}  
    </main>
  )
}
