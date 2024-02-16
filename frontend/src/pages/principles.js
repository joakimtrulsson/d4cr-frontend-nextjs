import React, { useState } from "react";
import { gql } from "@apollo/client";
import client from "../apollo-client.js";
import PrinciplesCard from "../themes/components/principles-card.js";
import "../themes/sources/scss/base/utils.scss";
import "../themes/sources/scss/components/principles.scss";
import SecondaryButton from "../themes/components/buttons/secondary-button.js";

export default function Principles({ chapterContent }) {

  console.log(chapterContent.sections[0])
  const chapterContentProp = chapterContent.sections
    ? chapterContent.sections[0]
    : null;

  const [showAllCards, setShowAllCards] = useState(false);

  const handleToggleCardsVisibility = () => {
    setShowAllCards(!showAllCards);
  };

  return (
    <main className="flex flex-column flex-align-center principles margin-t--s">
      {chapterContentProp ? (
        <>
          <div className="text-align-center">
            <h2 className="margin-t--xxs margin--zero">
              {chapterContentProp.title}
            </h2>
            <p className="large-text margin-t--xxs">
              {chapterContentProp.preamble[0] && (
                <>{chapterContentProp.preamble[0].children[0].text}</>
              )}
            </p>
          </div>
          {chapterContentProp.groups[0] && (
            <>
              <h4 className={"color-grey-400"}>
                {chapterContentProp.groups[0].groupTitle}
              </h4>
              <div className="flex flex-row flex-wrap flex-justify-center flex-align-center">
                {chapterContentProp.groups[0].principles.map((principle) => (
                  <div className="card-wrapper">
                    <PrinciplesCard
                      title={
                        principle.principleNumber.number +
                        ". " +
                        principle.title
                      }
                      url={principle.slug}
                      key={principle.id}
                      img={principle.image && principle.image.url ? principle.image.url : ''}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
          {chapterContentProp.groups.length > 1 ? (
            <>
              <h4 className={"color-grey-400"}>
                {chapterContentProp.groups[1].groupTitle}
              </h4>
              <div
                className={`flex flex-row flex-wrap flex-justify-center flex-align-center ${
                  showAllCards ? "" : "opacity-second-group"
                }`}
              >
                {chapterContentProp.groups[1].principles.map((principle) => (
                  <div className="card-wrapper">
                    <PrinciplesCard
                      title={
                        principle.principleNumber.number +
                        ". " +
                        principle.title
                      }
                      url={principle.slug}
                      key={principle.id}
                      img={principle.image && principle.image.url ? principle.image.url : ''}
                    />
                  </div>
                ))}
              </div>
              {chapterContentProp.groups.length > 2 ? (
                <>
                  <div
                    className={`full-width-height flex flex-column flex-wrap flex-justify-center flex-align-center ${
                      showAllCards ? "" : "hide-cards"
                    }`}
                  >
                    {chapterContentProp.groups.slice(2).map((group, index) => (
                      <div key={index}>
                        <h4 className={"color-grey-400 text-align-center"}>
                          {group.groupTitle}
                        </h4>
                        <div className="flex flex-row flex-wrap flex-justify-center">
                          {group.principles.map((principle) => (
                            <div className="card-wrapper" key={principle.id}>
                              <PrinciplesCard 
                                title={
                                  principle.principleNumber.number +
                                  ". " +
                                  principle.title
                                }
                                url={principle.slug}
                                img={principle.image && principle.image.url ? principle.image.url : ''}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : null}
              <div className="button-wrapper margin-tb--s">
                <SecondaryButton
                  title={`${showAllCards ? "Minimize" : "SEE ALL"}`}
                  onClick={handleToggleCardsVisibility}
                />
              </div>
            </>
          ) : null}
        </>
      ) : (
        null
      )}
    </main>
  );
}

export async function getServerSideProps() {
  // remove this when you're done with this section
  try {
    const chapterQuery = gql`
      query Chapter($where: ChapterWhereUniqueInput!) {
        chapter(where: $where) {
          title
          chapterLanguage
          heroImage
          preamble {
            document
          }
          translatedChapters {
            title
            chapterLanguage
            heroImage
            preamble {
              document
            }
            slug
            status
          }
          slug
          sections
          status
          
        }
      }
    `;
    const chapterResult = await client.query({
      query: chapterQuery,
      variables: { where: { slug: "/chapters/paris" } },
    });

    const chapterData = chapterResult.data.chapter;

    return {
      props: {
        chapterContent: chapterData,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        chapterContent: null,
      },
    };
  }
}
