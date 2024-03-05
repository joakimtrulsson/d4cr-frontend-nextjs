
import "../sources/scss/base/utils.scss";
import Image from "next/image";
import ArrowRight from "../sources/assets/graphics/icons/arrow-right.svg";
import img from "../sources/assets/graphics/placeholder/dummy-image2.jpeg"
//import "../sources/scss/components/resources-card.scss";

const ResourceCard = (props) => {
    const { title, url, resourceType } = props.prop;

    // Initialize `type` variable
    let type = null;

    // Check if `resourceType` and `resourceType.type` exist
    if (resourceType && resourceType.type) {
        type = resourceType.type; // Assign the type if it exists
    }

    console.log(props.prop); // Now `type` will either be null or `resourceType.type`
    const formattedUrl = url.startsWith('http://') || url.startsWith('https://') ? url : `http://${url}`;

    return (

        <main className="resource-card flex flex-column flex-wrap bg-yellow-50 margin-t--m">


            <Image src={img} className=""
                width={230}
                height={150}
                alt="Image put in by user in principle-card" />
            <div>{title}</div>
            <div className="flex flex-row flex-nowrap flex-space-between bottom-container">
                <a href={formattedUrl} target="_blank" rel="noopener noreferrer">{type}</a>

                <a href={formattedUrl}>
                    <Image className="arrow-right" src={ArrowRight} alt="link arrow" />
                </a>
            </div>

        </main>
    );
};

export default ResourceCard