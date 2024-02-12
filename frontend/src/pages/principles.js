import React, { useEffect, useState } from "react";
import { gql } from '@apollo/client';
import client from '../apollo-client.js';
import PrinciplesCard from "../themes/components/principles-card.js";
import "../themes/sources/scss/base/utils.scss";
import "../themes/sources/scss/components/principles.scss";
import SecondaryButton from "../themes/components/buttons/secondary-button.js";


export default function Principles({ content }) {

  console.log("Principles page: ", content) // remove this when you're done with this section

  const [showAllCards, setShowAllCards] = useState(true)
  const handleToggleCardsVisibility = () => {
    setShowAllCards(!showAllCards)
  }

  return (
    <main className="flex flex-column flex-align-center principles">
      <div className="text-align-center">
        <h2 className="margin-t--xxs margin--zero">Principles</h2>
        <p className="large-text margin-t--xxs">
          These are the principles used here
        </p>
      </div>
      <div className={`full-width-height margin-tb--s flex flex-row flex-wrap flex-justify-center flex-align-center cards-container ${showAllCards ? '' : 'hide-cards'}`}>
        <div className="card-wrapper">

          {content.principles.map((principle, index) => (
            <PrinciplesCard
              title={principle.title}
              url={principle.slug}
            />
          ))}

        </div>
      </div>
      <div className="button-wrapper margin-tb--s">
        <SecondaryButton title={"SEE ALL"} onClick={handleToggleCardsVisibility} />
      </div>
    </main>
  );
}


export async function getServerSideProps() { // remove this when you're done with this section
  try {

    const { data } = await client.query({
      query: gql`
      query {
        principles {
            title
            slug
            subHeader
            quote
            quoteAuthor
            image 
            principleCategory {
                title
            }
            principleNumber {
                number
            }
            status
            subPrinciples
          }
        }
        
      `
    });

    return { props: { content: data } }

  } catch (error) {

    console.error("Error fetching data:", error)
    return { props: { chapters: null } }
  }
}
