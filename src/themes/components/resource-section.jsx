
import ResourceCard from "./resource-card.jsx";
import "../sources/scss/base/utils.scss";
import SecondaryButton from "./buttons/secondary-button.jsx";

export default function Resources(content) {
  const resources = content.content
  const resourceTitle = resources.title
  const resourcePreamble = resources.preamble[0].children[0].text
  


  return (
    <main >
      <h1>{resources.title}</h1>
      <h2>{resourcePreamble}</h2>

      {resources.resources.map((resourceGroup) => (
        <div key={resourceGroup.groupTitle}>
          <h3>{resourceGroup.groupTitle}</h3>
          
          {resourceGroup.resources.map((group) => (

            <div key={group.id}><ResourceCard prop={group} /></div>
          ))}
        </div>

      )
      )

      }</main>
  );
}