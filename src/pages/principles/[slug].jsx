import { gql } from '@apollo/client';
import React, { useState } from 'react';
import client from '../../apollo-client.js';
import Image from 'next/image';
import '../../themes/sources/scss/app.scss';
import LargeBulletList from '../../themes/components/large-bullet-list.jsx';
import ButtonDown from '../../themes/sources/assets/graphics/buttons/btn-scroll-down-default.svg'
import ButtonDownHover from '../../themes/sources/assets/graphics/buttons/btn-scroll-down-hover.svg'
import BottomWave from '../../themes/components/waves/bottom-wave.jsx'

export default function PrinciplesPage(props) {
    const principle = props.principle
    const principlesNumber = props.principleNumbers
    console.log('principleinComp', principle, principlesNumber, props.slug)

    if (principle) {

        ////////////////change props to work in large-bullet list///////////////////
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
            bullets: transformedSubPrinciples,
            listType: 'UNORDERED',
        };

        //////////////////////////toplinks////////////////////////////////
        // Find the index of the current principle in the principlesNumber array
        const currentIndex = principlesNumber.findIndex(numbers => numbers.principles.slug === props.slug);
        // Calculate the index for the "Tidigare" (Previous) principle
        const previousIndex = currentIndex - 1;
        // Ensure the previous index is within the array bounds
        const previousSlug = previousIndex >= 0 ? principlesNumber[previousIndex].principles.slug : null;
        //nästa slug
        const nextIndex = currentIndex + 1;
        const nextSlug = nextIndex < principlesNumber.length ? principlesNumber[nextIndex].principles.slug : null;

        //////////////////wave///////////////////////////
        const fillColorClass = 'fill-turquoise-50';

        //////////////Button-scroll/////////////////
        const [logoSrc, setLogoSrc] = useState(ButtonDown);

        return (
            <main>

                <div>
                    <div className="flex flex-row bg-turquoise-100 flex-justify-center">{previousSlug && (
                        <a href={`./${previousSlug}`} className="previous-link">
                            <h2>Tidigare</h2>
                        </a>
                    )} {principlesNumber.map(((numbers) => {
                        const isActive = props.slug === numbers.principles.slug;
                        return (<div>
                            <a key={numbers.principles.id} href={`.${numbers.principles.slug}`} className={isActive ? 'active-link' : ''}
                                style={isActive ? { color: 'red' } : {}}> <h2> {numbers.number} </h2></a></div>
                        )
                    }))}
                        {nextSlug && (<a href={`./${nextSlug}`} className="next-link">
                            <h2>Nästa</h2>
                        </a>)}
                    </div>

                    <div className="bg-turquoise-50 margin-tb--xxxs-negative">
                        <div className="flex flex-row flex-nowrap title-div">
                            <div className="flex flex-column width--m left-part">
                                <h4 className="margin--zero">{'Principle ' + principle.principleNumber.number}</h4>
                                <h1>{principle.title}</h1>
                                <h3>{principle.subHeader}</h3>
                            </div>
                            <div className="flex flex-column width--m right-part">
                                <div className="">
                                    <h3>{principle.quote}</h3>
                                    <h4>{principle.quoteAuthor}</h4>
                                </div>
                                <div className="">
                                    {principle.image ? (
                                        <Image
                                            className="img-size"
                                            width={400}
                                            height={400}
                                            src={principle.image.url}
                                            alt="Image put in by user in principle-card"
                                        />
                                    ) : (
                                        <div className="no-image-placeholder">No Image</div>
                                        // Or simply do not render anything or render a placeholder div
                                    )}
                                </div>
                            </div>
                        </div>
                        <a className="width-full flex flex-justify-center padding--m" href="#target-section"><Image src={logoSrc} onMouseEnter={() => {
                            setLogoSrc(ButtonDownHover);
                        }}
                            onMouseOut={() => {
                                setLogoSrc(ButtonDown);
                            }} className="scroll-button" /></a>

                    </div>
                    <BottomWave fillColorClass={fillColorClass} />
                </div>
                <div id="target-section" className="bullet-div">
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
    try {

        const { data: principleData } = await client.query({
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

        return {
            props: {
                slug: slug,
                principle: principleData.principle,
                principleNumbers: principleNumbersData.principleNumbers
            }
        }

    } catch (error) {
        console.error("Error fetching data:", error)
        return { props: { principle: null, principleNumbers: null } }
    }
}