import React, { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import client from "../apollo-client.js";
import PrinciplesCard from "../themes/components/principles-card.js";
import "../themes/sources/scss/base/utils.scss";
import "../themes/sources/scss/components/principles.scss";
import SecondaryButton from "../themes/components/buttons/secondary-button.js";

export default function Principles({ chapterContent }) {
  console.log("Principles page: ", chapterContent.sections); // remove this when you're done with this section
  const chapterContentProp = chapterContent.sections
    ? chapterContent.sections[0]
    : null;
  const [showAllCards, setShowAllCards] = useState(false);
  // const [isOpaque, setIsOpaque] = useState(false);
  // const [minText, setMinText] = useState(false);

  const handleToggleCardsVisibility = () => {
    setShowAllCards(!showAllCards);
    // setIsOpaque(!isOpaque);
    // setMinText(!minText);
  };

  return (
    <main className="flex flex-column flex-align-center principles">
      {chapterContentProp ? (
        <>
          <div className="text-align-center">
            <h2 className="margin-t--xxs margin--zero">
              {chapterContentProp.title}
            </h2>
            <p className="large-text margin-t--xxs">
              {chapterContentProp.preamble[0] ? (
                <>{chapterContentProp.preamble[0].children[0].text}</>
              ) : null}
            </p>
          </div>

          <h4 className={"color-grey-400"}>{chapterContentProp.groups[0].groupTitle}</h4>
          <div className="flex flex-row flex-wrap">
            {chapterContentProp.groups[0].principles.map((principle) => (
              <div className="card-wrapper">
                <PrinciplesCard
                  title={
                    principle.principleNumber.number + ". " + principle.title
                  }
                  url={principle.slug}
                  key={principle.id}
                />
              </div>
            ))}
          </div>
          {chapterContentProp.groups.length > 1 ? (
            <>
              <h4 className={"color-grey-400"}>{chapterContentProp.groups[1].groupTitle}</h4>
              <div
                className={`flex flex-row flex-wrap ${
                  showAllCards ? "" : "opacity-second-group"
                }`}
              >
                {chapterContentProp.groups[1].principles.map(
                  (principle) => (
                    <div className="card-wrapper">
                      <PrinciplesCard
                        title={
                          principle.principleNumber.number +
                          ". " +
                          principle.title
                        }
                        url={principle.slug}
                        key={principle.id}
                      />
                    </div>
                  )
                )}
              </div>
              {chapterContentProp.groups.length > 2 ? (
                <>
                  <div
                    className={`full-width-height margin-tb--s flex flex-column flex-wrap flex-justify-center flex-align-center cards-container ${
                      showAllCards ? "" : "hide-cards"
                    }`}
                  >
                    {chapterContentProp.groups.slice(2).map((group, index) => (
                      <div key={index}>
                        <h4 className={"color-grey-400 text-align-center"}>{group.groupTitle}</h4>
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
        <div>Loading or no content available</div>
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
      variables: { where: { slug: "/chapters/mecklenburg" } },
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
