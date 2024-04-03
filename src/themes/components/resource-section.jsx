
import ResourceCard from "./resource-card.jsx";
import SecondaryButton from "./buttons/secondary-button.jsx";
import Link from 'next/link';

export default function Resources(content) {
  const resources = content.content
  const resourceTitle = resources.title
  const resourcePreamble = resources.preamble[0].children[0].text



  return (
    <main >
      <div className="resources-outer-container flex flex-column flex-align-center">

        <h2 className="text-align-center margin-b--zero">{resourceTitle ? resourceTitle : 'Resources'}</h2>
        <p className="text-align-center margin-t--zero margin-b--s large-text">{resourcePreamble ? resourcePreamble : null}</p>

        <div className="resources-inner-container flex flex-row flex-wrap flex-justify-start flex-align-between ">
      {console.log('lolol', resources)}
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
          <Link href="../../resources" className="link-browse">
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