import { useEffect, useState } from 'react';
// import { BASE_URL_BACKEND } from '../utils/constants';
import { API_URL } from '../../utils/constants';

const useFetchNews = (query) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const queryForAllNews =
    'query NewsCategories {newsCategories {categoryTitlerelatedNews {titleidslugnewsCategory {categoryTitle imagesectionsstatuscreatedAt}}}';

  const queryAllNewsByChapter =
    'query NewsItems($where: NewsWhereInput!) { newsItems(where: $where) {title slug newsCategory{categoryTitle} relatedChapters {title} image sections status createdAt} }';

  const queryAllNewsByChapterVariable =
    '{ "where": { "relatedChapters": {"some": {"title": {"equals": "malmo"}}}}}';

  const queryNewsByCategoryAndChapter = '';
  const queryNewsByCategoryAndChapterVariable = '';

  const queryNewsByCategory = '';

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`${API_URL}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
            query NewsCategories {
              newsCategories {
                categoryTitle
                relatedNews {
                  title
                  id
                  slug
                  newsCategory {
                    categoryTitle
                  }
                  
                  image
                  sections
                  status
                  createdAt
                }
              }
            }
            `,
          }),
        });

        const { data } = await response.json();
        setNews(data.news);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return { news, loading, error };
};

export default useFetchNews;
