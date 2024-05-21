import React, { useEffect, useState } from 'react';

import { PrinciplesCard } from '../index.js';

export default function Principles({ content }) {
  const [sortedPrinciples, setSortedPrinciples] = useState([]);

  useEffect(() => {
    const principlesByCategory = content.principles.reduce((acc, principle) => {
      const categoryTitle = principle.principleCategory.title;
      if (!acc[categoryTitle]) {
        acc[categoryTitle] = [];
      }
      acc[categoryTitle].push(principle);
      return acc;
    }, {});

    const categoriesSortedByMinNumber = Object.entries(principlesByCategory)
      .map(([categoryTitle, principles]) => ({
        categoryTitle,
        minNumber: Math.min(...principles.map((p) => p.principleNumber.number)),
      }))
      .sort((a, b) => a.minNumber - b.minNumber)
      .map(({ categoryTitle }) => categoryTitle);

    setSortedPrinciples({ principlesByCategory, categoriesSortedByMinNumber });
  }, [content]);

  return (
    <main className='flex flex-column flex-align-center principles'>
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
                {sortedPrinciples.categoriesSortedByMinNumber.map(
                  (categoryTitle, index) => {
                    const principles =
                      sortedPrinciples.principlesByCategory[categoryTitle];
                    return (
                      <div key={index}>
                        <h4
                          className={
                            'principles-categorytitle sub-heading-m color-grey-400 text-align-center margin-t--s margin--zero'
                          }
                        >
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
                    );
                  }
                )}
              </div>
            </>
          ) : null}
        </>
      ) : null}
    </main>
  );
}
