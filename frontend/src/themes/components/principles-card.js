import "../sources/scss/components/principles-card.scss";
import "../sources/scss/base/utils.scss";
import Image from "next/image";
import ArrowRight from "../sources/assets/graphics/icons/arrow-right.svg";

const PrinciplesCard = ({ title, url, img }) => {
  return (
    <div
      className={`principles-card flex flex-row
            bg-yellow-50 borderradius--xxs`}
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
          <div className="no-image-placeholder">No Image</div>
          // Or simply do not render anything or render a placeholder div
        )}
      </div>
      <div className="text-container">
        <div className="title-text">
          <a className="no-decoration " href={url}>
            <h4 className="color-grey-700 text-overflow">{title}</h4>
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
