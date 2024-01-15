import Navbar from '../components/navbar'
import Link from 'next/link'

const LocalChapters = () => {


  return (
    <div>
      <Navbar />
      <h1>Local Chapters</h1>
      <Link href="/local-chapters/[slug]" as="/local-chapters/malmö">Malmö</Link>
    </div>
  );
}

export default LocalChapters
