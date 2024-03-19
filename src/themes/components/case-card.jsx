import Image from "next/image";
import ArrowRight from "../sources/assets/graphics/icons/arrow-right.svg";
import Link from "next/link"
const CaseCard = ({ link, quote, title, img, check }) => {
    const linkText = check ? ('Go to their website') : ('Read our case'); 
    //oklart hur man ska göra här, bäst om backenden bestömmer och ger linkexternalpage eller linkinternal? varför behövs linkinternal?
    // Eller så kollar frontenden url:n på nåt sätt. Nu blir det Go to our website oavsett om det är länkat till vår sida eller external
    return (
        <div className="case-card-container">
            <div className="img-div"><Image src={img} width={60} height={60} /></div>
            <div className="text-div">
                <h3>{title}</h3>
                <div className="quote-div">
                    <svg className="quote-marks" width="46" height="34" viewBox="0 0 46 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.84624 13.3912C12.6484 13.4595 14.9722 14.4163 16.8176 16.2617C18.6629 18.107 19.6197 20.4308 19.6881 23.233C19.6197 26.0352 18.6629 28.359 16.8176 30.2043C14.9722 32.0497 12.6484 33.0065 9.84624 33.0749C7.04405 33.0065 4.72028 32.0497 2.87493 30.2043C1.02959 28.359 0.0727407 26.0352 0.00439453 23.233V13.3912C0.0727407 9.70046 1.37132 6.62489 3.90013 4.16442C6.36059 1.63562 9.43617 0.337038 13.1269 0.268692C14.0837 0.268692 14.8697 0.57625 15.4848 1.19137C16.0999 1.80648 16.4075 2.59246 16.4075 3.54931C16.4075 4.50615 16.0999 5.29214 15.4848 5.90725C14.8697 6.52237 14.0837 6.82992 13.1269 6.82992C11.2815 6.89827 9.74372 7.54756 8.51349 8.77779C7.28326 10.008 6.63397 11.5458 6.56563 13.3912V14.0063C7.59082 13.5962 8.68436 13.3912 9.84624 13.3912ZM36.0912 13.3912C38.8934 13.4595 41.2171 14.4163 43.0625 16.2617C44.9078 18.107 45.8647 20.4308 45.933 23.233C45.8647 26.0352 44.9078 28.359 43.0625 30.2043C41.2171 32.0497 38.8934 33.0065 36.0912 33.0749C33.289 33.0065 30.9652 32.0497 29.1199 30.2043C27.2745 28.359 26.3177 26.0352 26.2493 23.233V13.3912C26.3177 9.70046 27.6162 6.62489 30.1451 4.16442C32.6055 1.63562 35.6811 0.337038 39.3718 0.268692C40.3286 0.268692 41.1146 0.57625 41.7297 1.19137C42.3448 1.80648 42.6524 2.59246 42.6524 3.54931C42.6524 4.50615 42.3448 5.29214 41.7297 5.90725C41.1146 6.52237 40.3286 6.82992 39.3718 6.82992C37.5264 6.89827 35.9887 7.54756 34.7584 8.77779C33.5282 10.008 32.8789 11.5458 32.8106 13.3912V14.0063C33.8357 13.5962 34.9293 13.3912 36.0912 13.3912Z" fill="#BDBDBD" />
                    </svg>
                    <p className="quote">{quote}</p>
                </div>
            </div>
            <Link href={link} className="link-div"><p className="text-link small-text">{linkText}</p><Image className="img-link" height={13} width={13} src={ArrowRight} /></Link>

        </div>)
}

export default CaseCard