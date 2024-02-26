import { gql } from '@apollo/client';
import React, { useState } from 'react';
import client from '../../apollo-client.js';
import Image from 'next/image';
import '../../themes/sources/scss/app.scss';
import LargeBulletList from '../../themes/components/large-bullet-list.jsx';
export default function PrinciplesPage(props) {
    const principle = props.principle
    const principlesNumber = props.principleNumbers
    console.log('principleinComp',principle, principlesNumber)

    if (principle) {
         

        // Assume principle.subPrinciples is the array from your GraphQL query
        const transformedSubPrinciples = Array.isArray(principle.subPrinciples) ? principle.subPrinciples.map(subPrinciple => {
            // Check if subPrinciple.text is an array and not undefined or null
            const bodyText = Array.isArray(subPrinciple.text) ? subPrinciple.text.map(textItem => {
                // Check each textItem for 'children' array existence
                return {
                    type: 'paragraph',
                    children: Array.isArray(textItem.children) ? textItem.children.map(child => {
                        // Assuming 'child.text' is always present if 'child' exists, but you could add more checks here if needed
                        return { text: child.text };
                    }) : [] // Return an empty array if 'children' does not exist or is not an array
                };
            }) : []; // Return an empty array if 'text' does not exist or is not an array

            return {
                bodyText: bodyText,
            };
        }) : [];

        // This would now be the array to pass into your LargeBulletList component
        const contentForLargeBulletList = {
            title: 'Your Title Here',
            subHeader: 'Your Subheader Here',
            bullets: transformedSubPrinciples,
            listType: 'ORDERED', // Or 'ORDERED', depending on your data
        };


        return (
            <main>
                <div className="flex flex-row"> {principlesNumber.map(((numbers) => (
                  <a href={`.${numbers.principles.slug}`}> <h2 key ={numbers.number}> {numbers.number} </h2></a>
                )))} 
                </div>
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
                    <LargeBulletList content={contentForLargeBulletList} />
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

        const { data : principleData } = await client.query({
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

        // Numberstop PrincipleNumbers query
        const { data: principleNumbersData } = await client.query({
            query: gql`
            query PrincipleNumbers {
                principleNumbers(orderBy: { number: asc } 
                where: { principles: { status: { equals: "published" } } } )  {
                    number
                    principles {
                        id
                        status
                        title
                        subHeader
                        slug
                        image
                        quote
                        quoteAuthor
                        subPrinciples 
                        resources
                        principleCategory {
                            title
                        }
                    }
                }
            }
        `
        });
        console.log('Principle data', principleData)
        console.log('PrincipleNumbers data', principleNumbersData)

        return {
            props: {
                principle: principleData.principle,
                principleNumbers: principleNumbersData.principleNumbers
            }
        }

    } catch (error) {
        console.error("Error fetching data:", error)
        return { props: { principle: null, principleNumbers: null } }
    }
}