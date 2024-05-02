import React, { useEffect, useState } from 'react';
import PrinciplesCard from '../PrinciplesCard/PrinciplesCard.jsx';

export default function Principles({ content }) {
  const [sortedPrinciples, setSortedPrinciples] = useState([]);

  useEffect(() => {
    const sortedPrinciples = [...content.principles].sort((a, b) => {
      if (a.principleCategory.title < b.principleCategory.title) {
        return -1;
      }
      if (a.principleCategory.title > b.principleCategory.title) {
        return 1;
      }
      return a.principleNumber.number - b.principleNumber.number;
    });

    const principlesByCategory = sortedPrinciples.reduce((acc, principle) => {
      const categoryTitle = principle.principleCategory.title;
      if (!acc[categoryTitle]) {
        acc[categoryTitle] = [];
      }
      acc[categoryTitle].push(principle);
      return acc;
    }, {});

    setSortedPrinciples(principlesByCategory);
  }, [content]);

  return (
    <main className='flex flex-column flex-align-center principles margin-t--s'>
      {content && content?.principles?.length > 0 ? (
        <>
          <div className='text-align-center'>
            <h2 className='margin-t--xxs margin--zero'>{content.title}</h2>
            <p className='large-text margin-t--xxs'>
              {content.preamble[0] && <>{content.preamble[0].children[0].text}</>}
            </p>
          </div>

          {Object.entries(sortedPrinciples).length > 0 ? (
            <>
              <div
                className={`full-width-height flex flex-column flex-wrap flex-justify-center flex-align-center
        }`}
              >
                {Object.entries(sortedPrinciples).map(
                  ([categoryTitle, principles], index) => (
                    <div key={index}>
                      <h4 className={'color-grey-400 text-align-center'}>
                        {categoryTitle}
                      </h4>
                      <div className='principles-container flex flex-row flex-wrap flex-justify-center flex-align-center'>
                        {principles.map((principle) => (
                          <PrinciplesCard
                            key={principle.id}
                            title={
                              principle.principleNumber.number + '. ' + principle.title
                            }
                            subHeader={principle.subHeader}
                            url={'/principles' + principle.slug}
                            img={
                              principle.image && principle.image.url
                                ? principle.image.url
                                : ''
                            }
                          />
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            </>
          ) : null}
        </>
      ) : null}
    </main>
  );
}
