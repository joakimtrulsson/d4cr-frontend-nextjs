
import "../sources/scss/base/utils.scss";
import Image from "next/image";
import ArrowRight from "../sources/assets/graphics/icons/arrow-right.svg";

const ResourceCard = (props) => {
    const {title, url} = props.prop;
    console.log(props.prop.resourceType.type)
    const formattedUrl = url.startsWith('http://') || url.startsWith('https://') ? url : `http://${url}`;
    
    return (

        <main>

            <div>{ title}</div>
            <div><a href={formattedUrl} target="_blank" rel="noopener noreferrer">Tryck</a></div>
        </main>
    );
};

export default ResourceCard