import { gql } from '@apollo/client';
import React, { useState } from 'react';
import client from '../../apollo-client.js';
import Image from 'next/image';
import '../../themes/sources/scss/base/utils.scss';

export default function PrinciplesPage({ principle }) {
    if (principle) {

        console.log('subPrinciple', principle.subPrinciples[0].text[0].children[0].text);
        console.log('number', principle.principleNumber.number);
        console.log('all', principle)
        return (
            <main>
                <div className="bg-color-turquoise-50">
                    <div>
                        <h4>{'Principle ' + principle.principleNumber.number}</h4>
                        <h1>{principle.title}</h1>
                        <h3>{principle.subHeader}</h3>
                    </div>
                    <div>
                        <h3>{principle.quote}</h3>
                        <h4>{principle.quoteAuthor}</h4>
                    </div>
                    <div className="">
                        {principle.image ? (
                            <Image
                                className="img-size"
                                width={200}
                                height={100}
                                src={principle.image.url}
                                alt="Image put in by user in principle-card"
                            />
                        ) : (
                            <div className="no-image-placeholder">No Image</div>
                            // Or simply do not render anything or render a placeholder div
                        )}
                    </div>
                </div>
                <div>
                    {principle.subPrinciples.map(subPrinciple => {
                        { console.log(subPrinciple.text[0].children[0].text) }
                        return <div>{subPrinciple.text[0].children[0].text}</div>
                    })}
                </div>
            </main>
        )

    } else {
        // Handle the case where principle is null
        console.log('Principle not found', principle);
    }
}


export async function getServerSideProps({ resolvedUrl }) {
    const slug = '/' + resolvedUrl.split('/').pop();
    console.log('info ', resolvedUrl, slug)
    try {

        const { data } = await client.query({
            query: gql`
        query Principle($where: PrincipleWhereUniqueInput!) {
            principle(where: $where) {
              title
              slug
              resources
              subHeader
              quote
              quoteAuthor
              image
              principleCategory{
                  title
              }
              principleNumber{
                  number
              }
              subPrinciples
              status
            }
          }
        `,
            variables: { where: { slug } }
        });

        console.log('data', data)
        return { props: { principle: data.principle } }

    } catch (error) {

        console.error("Error fetching data:", error)
        return { props: { principle: null } }
    }
}