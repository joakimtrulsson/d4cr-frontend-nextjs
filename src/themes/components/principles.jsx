import React, { useState } from "react";
import PrinciplesCard from "./principles-card.jsx";


export default function Principles({ content: chapterContent }) {

  const chapterContentProp = chapterContent ? chapterContent : null;

  return (
    <main className="flex flex-column flex-align-center principles margin-t--s">
      {chapterContentProp && (chapterContentProp?.groups?.length > 0) ? (
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
          
          {chapterContentProp.groups.length > 0 ? (
            <>
              <div
                className={`full-width-height flex flex-column flex-wrap flex-justify-center flex-align-center
                  }`}
              >
                {chapterContentProp.groups.map((group, index) => (
                  <div key={index}>
                    <h4 className={"color-grey-400 text-align-center"}>
                      {group.groupTitle}
                    </h4>
                    <div className="principles-container flex flex-row flex-wrap flex-justify-center flex-align-center">
                      {group.principles.map((principle) => (

                        <PrinciplesCard
                          key={principle.id}
                          title={
                            principle.principleNumber.number +
                            ". " +
                            principle.title
                          }
                          subHeader={principle.subHeader}
                          url={"/principles" + principle.slug}

                          img={
                            principle.image && principle.image.url
                              ? principle.image.url
                              : ""
                          }
                        />

                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : null}
         
        </>
      ) : null}
    </main>
  );
}