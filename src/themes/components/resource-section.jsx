
import ResourceCard from "./resource-card.jsx";
import "../sources/scss/base/utils.scss";
import SecondaryButton from "./buttons/secondary-button.jsx";

export default function Resources(content) {
  const resources = content.content
  const resourceTitle = resources.title
  const resourcePreamble = resources.preamble[0].children[0].text



  return (
    <main >
      <div className="resources-outer-container">

        <h1 className="text-align-center">{resources.title}</h1>
        <h4 className="text-align-center margin-b--xl">{resourcePreamble}</h4>

        <div className="resources-inner-container padding-b--m padding-lr--m margin-lr--s flex flex-row flex-wrap flex-justify-between flex-align-between ">

          {/* kommer behöva ändra struktur här om strukturen ändras i backend, antingen om allt blir en grupp eller grouptitle tas bort*/}
          {resources.resources.map((resourceGroup) => (
            resourceGroup.resources.map((group) => (

              <ResourceCard key={group.id} prop={group} className="card-component" />
            ))


          )
          )

          }

        </div>

      </div>

    </main >
  );
}