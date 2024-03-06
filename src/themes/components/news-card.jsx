import '../sources/scss/components/news-card.scss';
import '../sources/scss/base/utils.scss'
import Image from 'next/image'
import PlaceHolder from '../sources/assets/graphics/placeholder/dummy-image1.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

const Newscard = ({type, title, url}) => {

    const { library, config } = require('@fortawesome/fontawesome-svg-core');
    library.add(fas)

    const iconColor = '#FC7C37'

    return (
            <div className={`news-card full-width-height flex flex-column flex-justify-start 
            bg-yellow-50 borderradius--xs`}>            
                <Image className='full-width-height' src={PlaceHolder} alt="" /> 

            <div className='sub-head-wrapper bg-yellow-100 width-full margin-t--xxxs-negative'>
                <h2 className='sub-heading-m text-align-center color-yellow-600 uppercase'>{type}</h2>
            </div>

            <div className='margin-lr--xs'>
                <a className='no-decoration' href={url}>
                    <h3 className='color-grey-700'>{title}</h3>
                </a>
            </div>

            <div className='arrow-right-wrapper margin-b--s width-full flex flex-justify-end bottom-0'>
                <a href={url}>
                    <FontAwesomeIcon icon={['fas', 'arrow-right']} color={iconColor} />
                </a>
            </div>
        </div>
    );
};

export default Newscard;
