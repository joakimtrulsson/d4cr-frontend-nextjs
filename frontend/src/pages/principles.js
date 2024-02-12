import React, { useEffect, useState } from "react";
import PrinciplesCard from "../themes/components/principles-card.js";
import "../themes/sources/scss/base/utils.scss";
import "../themes/sources/scss/components/principles.scss";
import SecondaryButton from "../themes/components/buttons/secondary-button.js";
import TextAndMedia from "../themes/components/text-media.js";

export default function Principles() {
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
          <PrinciplesCard
            title="1. Gather and respect children’s views"
            url="bla"
          />
        </div>
        <div className="card-wrapper">
          <PrinciplesCard title="2. Everyone can use" url="bla" />
        </div>
        <div className="card-wrapper">
          <PrinciplesCard
            title="3. Use communication children can understand"
            url="bla"
          />
        </div>
        <div className="card-wrapper">
          <PrinciplesCard url="bla" title="4. Allow and support exploration" />
        </div>
        <div className="card-wrapper">
          <PrinciplesCard
            url="bla"
            title="5. Encourage children to play with others"
          />
        </div>
        <div className="card-wrapper">
          <PrinciplesCard url="bla" title="6. Create a balanced environment" />
        </div>
        <div className="card-wrapper">
          <PrinciplesCard
            url="bla"
            title="7. Keep children safe and protected"
          />
        </div>
        <div className="card-wrapper">
          <PrinciplesCard url="bla" title="8. Do not misuse children’s data" />
        </div>
        <div className="card-wrapper">
          <PrinciplesCard
            url="bla"
            title="9. Help children recognise and understand commercial activities"
          />
        </div>
        <div className="card-wrapper">
          <PrinciplesCard url="bla" title="10. Design for future" />
        </div>
      </div>
      <div className="button-wrapper margin-tb--s">
        <SecondaryButton title={"SEE ALL"} onClick={handleToggleCardsVisibility}/>
      </div>
    </main>
  );
}
