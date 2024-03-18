import Image from "next/image";
import ArrowRight from "../sources/assets/graphics/icons/arrow-right.svg";
import Link from "next/link"
const CaseCard = ({ link, quote, title, img }) => (
    <div className="case-card-container">
        <div className="img-div"><Image src={img} width={60} height={60} /></div>
        <div className="text-div">
            <h3>{title}</h3>
            <p className="quote">{quote}</p>
        </div>
        <Link href={link} className="link-div"><Image src={ArrowRight} /></Link>

    </div>
)

export default CaseCard