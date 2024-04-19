import Image from "next/image";
import ArrowRight from "../sources/assets/graphics/icons/arrow-right.svg";
///får inte preamble med queriet/subheader på pages
const PrinciplesCard = ({ title, url, img }) => {

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
          // Or simply do not render anything or render a placeholder div
        )}
      </div>
      <div className="text-container">
        <div className="title-text">
          <a className="no-decoration" href={url}>
            <h3 className="color-grey-700 text-overflow">{title}</h3>
          </a>
        </div>
        <div className="sub-header">
          <a className="no-decoration" href={url}>
            <h5 className="color-grey-700 text-overflow">PEFEF F EFEF EFFE EF EF EF E FEF</h5>
          </a>
        </div>
        <div className="arrow-text">
          <a href={url}>
            Learn more
            <Image className="arrow-right" src={ArrowRight} alt="link arrow" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default PrinciplesCard;