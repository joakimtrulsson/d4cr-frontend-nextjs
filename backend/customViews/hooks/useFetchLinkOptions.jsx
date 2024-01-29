import { useState, useEffect } from 'react';

const useFetchLinkOptions = () => {
  const [pagesOptions, setPagesOptions] = useState([]);

  useEffect(() => {
    const fetchLinkOptions = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
            query {
              chapters(where: { status: { equals: "published" } }) {
                slug
              }
              pages(where: { status: { equals: "published" } }) {
                slug
              }
            }
            `,
          }),
        });

        const { data } = await response.json();
        // const options = data.chapters.map((chapter) => ({
        //   label: `${chapter.slug}`,
        //   value: `${chapter.slug}`,
        // }));

        // Map chapters and pages separately, then concatenate the arrays
        const chaptersOptions = data.chapters.map((chapter) => ({
          label: `${chapter.slug}`,
          value: `${chapter.slug}`,
        }));

        const pagesOptions = data.pages.map((page) => ({
          label: `${page.slug}`,
          value: `${page.slug}`,
        }));

        const options = chaptersOptions.concat(pagesOptions);

        options.unshift({ label: 'Select', value: '' });

        setPagesOptions(options);
      } catch (error) {
        console.error('Error fetching chapters:', error);
      }
    };

    fetchLinkOptions();
  }, []);

  return pagesOptions;
};

export default useFetchLinkOptions;
