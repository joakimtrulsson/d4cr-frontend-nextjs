import { gql } from '@apollo/client';
import React, { useState } from 'react';
import client from '../../apollo-client.js';
import Image from 'next/image';
import '../../themes/sources/scss/app.scss';
import LargeBulletList from '../../themes/components/large-bullet-list.jsx';
import ButtonDown from '../../themes/sources/assets/graphics/buttons/btn-scroll-down-default.svg'
import ButtonDownHover from '../../themes/sources/assets/graphics/buttons/btn-scroll-down-hover.svg'
import BottomWave from '../../themes/components/waves/bottom-wave.jsx'
import ButtonRight from '../../themes/sources/assets/graphics/buttons/arrow-right-default.svg'

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
                <div className="flex flex-row bg-turquoise-100 flex-justify-center navbar-principle-links">{previousSlug ? (
                    <a href={`./${previousSlug}`} className="links image-arrows">
                        <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'scaleX(-1)' }}>
                            <path d="M15.4336 8.05859L9.80859 13.6836C9.57422 13.8945 9.30469 14 9 14C8.69531 14 8.42578 13.8945 8.19141 13.6836C7.98047 13.4492 7.875 13.1797 7.875 12.875C7.875 12.5703 7.98047 12.3008 8.19141 12.0664L11.918 8.375H1.125C0.796875 8.375 0.527344 8.26953 0.316406 8.05859C0.105469 7.84766 0 7.57812 0 7.25C0 6.92188 0.105469 6.65234 0.316406 6.44141C0.527344 6.23047 0.796875 6.125 1.125 6.125H11.918L8.19141 2.43359C7.98047 2.19922 7.875 1.92969 7.875 1.625C7.875 1.32031 7.98047 1.05078 8.19141 0.816406C8.42578 0.605469 8.69531 0.5 9 0.5C9.30469 0.5 9.57422 0.605469 9.80859 0.816406L15.4336 6.44141C15.6445 6.67578 15.75 6.94531 15.75 7.25C15.75 7.55469 15.6445 7.82422 15.4336 8.05859Z" fill="#090909" />
                        </svg><p>Previous</p>
                    </a>
                ) : (<div className="links image-arrows">
                    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'scaleX(-1)' }}>
                        <path d="M15.4336 8.05859L9.80859 13.6836C9.57422 13.8945 9.30469 14 9 14C8.69531 14 8.42578 13.8945 8.19141 13.6836C7.98047 13.4492 7.875 13.1797 7.875 12.875C7.875 12.5703 7.98047 12.3008 8.19141 12.0664L11.918 8.375H1.125C0.796875 8.375 0.527344 8.26953 0.316406 8.05859C0.105469 7.84766 0 7.57812 0 7.25C0 6.92188 0.105469 6.65234 0.316406 6.44141C0.527344 6.23047 0.796875 6.125 1.125 6.125H11.918L8.19141 2.43359C7.98047 2.19922 7.875 1.92969 7.875 1.625C7.875 1.32031 7.98047 1.05078 8.19141 0.816406C8.42578 0.605469 8.69531 0.5 9 0.5C9.30469 0.5 9.57422 0.605469 9.80859 0.816406L15.4336 6.44141C15.6445 6.67578 15.75 6.94531 15.75 7.25C15.75 7.55469 15.6445 7.82422 15.4336 8.05859Z" fill="#BDBDBD" />
                    </svg><p className='link-no-previous'>Previous</p>
                </div>)}

                    {principlesNumber.map(((numbers) => {
                        const isActive = props.slug === numbers.principles.slug;
                        return (<div>
                            <a key={numbers.principles.id} href={!isActive ? `.${numbers.principles.slug}`: null} className={`links`}
                            > <h2 className={`numbers ${isActive ? 'active-link' : ''}`}> {numbers.number} </h2></a></div>
                        )
                    }))}

                    {nextSlug ? (<a href={`./${nextSlug}`} className="links image-arrows"><p>Next</p>
                        <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.4336 8.05859L9.80859 13.6836C9.57422 13.8945 9.30469 14 9 14C8.69531 14 8.42578 13.8945 8.19141 13.6836C7.98047 13.4492 7.875 13.1797 7.875 12.875C7.875 12.5703 7.98047 12.3008 8.19141 12.0664L11.918 8.375H1.125C0.796875 8.375 0.527344 8.26953 0.316406 8.05859C0.105469 7.84766 0 7.57812 0 7.25C0 6.92188 0.105469 6.65234 0.316406 6.44141C0.527344 6.23047 0.796875 6.125 1.125 6.125H11.918L8.19141 2.43359C7.98047 2.19922 7.875 1.92969 7.875 1.625C7.875 1.32031 7.98047 1.05078 8.19141 0.816406C8.42578 0.605469 8.69531 0.5 9 0.5C9.30469 0.5 9.57422 0.605469 9.80859 0.816406L15.4336 6.44141C15.6445 6.67578 15.75 6.94531 15.75 7.25C15.75 7.55469 15.6445 7.82422 15.4336 8.05859Z" fill="#090909" />
                        </svg>
                    </a>) : (<div className="links image-arrows"><p className='link-no-previous'>Next</p>
                        <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.4336 8.05859L9.80859 13.6836C9.57422 13.8945 9.30469 14 9 14C8.69531 14 8.42578 13.8945 8.19141 13.6836C7.98047 13.4492 7.875 13.1797 7.875 12.875C7.875 12.5703 7.98047 12.3008 8.19141 12.0664L11.918 8.375H1.125C0.796875 8.375 0.527344 8.26953 0.316406 8.05859C0.105469 7.84766 0 7.57812 0 7.25C0 6.92188 0.105469 6.65234 0.316406 6.44141C0.527344 6.23047 0.796875 6.125 1.125 6.125H11.918L8.19141 2.43359C7.98047 2.19922 7.875 1.92969 7.875 1.625C7.875 1.32031 7.98047 1.05078 8.19141 0.816406C8.42578 0.605469 8.69531 0.5 9 0.5C9.30469 0.5 9.57422 0.605469 9.80859 0.816406L15.4336 6.44141C15.6445 6.67578 15.75 6.94531 15.75 7.25C15.75 7.55469 15.6445 7.82422 15.4336 8.05859Z" fill="#BDBDBD" />
                        </svg>
                    </div>)}
                </div>
                <div>

                    <div className="bg-turquoise-50 margin-tb--xxxs-negative">
                        <div className="flex flex-row flex-nowrap title-div">
                            <div className="flex flex-column width--m left-part">
                                <p className="margin--zero sub-heading-m gray-color">{'Principle ' + principle.principleNumber.number}</p>
                                <h1 classname="">{principle.title}</h1>
                                <p className="padding-tb--xxs margin--zero gray-color">{principle.subHeader}</p>
                            </div>
                            <div className="flex flex-column width--m right-part">
                                <div className="quote-container">
                                    <h4 className="quote">{principle.quote}</h4>
                                    <p className="quote-author">{principle.quoteAuthor}</p>
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
                        <a className="flex flex-justify-center padding--m" href="#target-section"><Image src={logoSrc} onMouseEnter={() => {
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