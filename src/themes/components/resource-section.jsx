
import ResourceCard from "./resource-card.jsx";
import "../sources/scss/base/utils.scss";
import SecondaryButton from "./buttons/secondary-button.jsx";
import Link from 'next/link';

export default function Resources(content) {
  const resources = content.content
  const resourceTitle = resources.title
  const resourcePreamble = resources.preamble[0].children[0].text



  return (
    <main >
      <div className="resources-outer-container flex flex-column flex-align-center">

        <h1 className="text-align-center  margin-b--zero">{resources.title}</h1>
        <h4 className="text-align-center margin-t--zero margin-b--s">{resourcePreamble}</h4>

        <div className="resources-inner-container flex flex-row flex-wrap flex-justify-start flex-align-between ">

          {/* kommer behöva ändra struktur här om strukturen ändras i backend, antingen om allt blir en grupp eller grouptitle tas bort*/}
          {resources.resources.map((resourceGroup) => (
            resourceGroup.resources.map((group) => (

              <ResourceCard key={group.id} prop={group} className="card-component" />
            ))


          )
          )

          }

        </div>
        <div className="button-wrapper">
          {/* {ska gå till resources} */}
          <Link href="../../principles/principle-9" className="link-browse">
            <SecondaryButton
              title="BROWSE ALL RESOURCES"
              className="button"
            />
          </Link>
        </div>
      </div>

    </main >
  );
}