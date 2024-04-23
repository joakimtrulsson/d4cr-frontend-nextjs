import Image from "next/image";
import ArrowRight from "../sources/assets/graphics/icons/arrow-right.svg";

const PrinciplesCard = ({ title, url, img, subHeader }) => {

  return (
    <div
      className={`principles-card flex flex-row
      bg-grey-25 borderradius--xxs`}
    >
      <div className="img-container">
        {img ? (
          <Image
            className="img-size"
            width={200}
            height={100}
            src={img}
            alt="Image put in by user in principle-card"
          />
        ) : (
          <div className="no-image-placeholder"></div>
        
        )}
      </div>
      <div className="text-container">
        <div className="title-text">
          <a className="no-decoration" href={url}>
            <h4 className="color-grey-700">{title}</h4>
          </a>
        </div>
        <div className="sub-header">
          <a className="no-decoration" href={url}>
            <p className="color-grey-700">{subHeader}</p>
          </a>
        </div>
        <div className="arrow-text">
          <a href={url}>
            <p>Learn more</p>
            <Image className="arrow-right"
              src={ArrowRight}
             
              height={14}
              alt="link arrow" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default PrinciplesCard;