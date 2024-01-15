import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
import NotFound from '../not-found'
// import { notFound } from 'next/navigation'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';
import LocalChaptersData from '../../components/data/local-chapters-data'


const SlugPage = () => {

  const [data, setData] = useState([]);

  // ==========================================================
  // ****************** fetch data below **********************
  // ==========================================================

  const result = async () => {
    
    try {
      const response = await fetch('http://localhost:3000/api/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
           query Chapters {
                      chapters {
                          id
                          title
                      }
                  }            `,
        }),
      });

      const data = await response.json();
      setData(data.data.chapters);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // ==========================================================

  const router = useRouter()
  const { slug } = router.query

  let slugCity = ''

  if (slug && typeof slug === 'string' && slug.length > 0) {
    slugCity = slug.charAt(0).toUpperCase() + slug.slice(1);
  } 

  let cityFound = false
  let cityName = ''
  let pageTitle = ''

  LocalChaptersData.forEach((cityObj) => {
    if(cityObj.city == slugCity) {
      cityFound = true
      cityName = cityObj.city
      pageTitle = cityObj.title
    }
  })

  if(!cityFound){
    // return notFound() or this below ? 
    return (<NotFound />)
  }


  return (
    <div>
      <Navbar/>

      <h1>{cityName}</h1>
      <h2>{pageTitle}</h2> 
      <button onClick={result}>result</button>

      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>

        <Footer/>
    </div> 
  );
}

export default SlugPage
