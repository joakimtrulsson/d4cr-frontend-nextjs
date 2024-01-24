import PrimaryButton from './buttons/primary-button'
import EarthSvg from '../sources/assets/graphics/icons/earth.svg'
import Image from 'next/image'
import '../sources/scss/base/utils.scss'

const Banner = () => {

    /* ersättas med data från datebase senare */
    const title = 'Become a member'
    const text = 'There are multiple ways to get involved. A good start is to join our Slack channel and we can talk more about the next step together.'
    const btnText = 'LEARN MORE'
    const btnUrl = '/learn-more'

    return (
        <div className='banner flex flex-row flex-justify-between flex-align-center bg-yellow-50 
        padding--s max-width-45 boderradius--xxs'>

            <div className='icon flex flex-justify-center flex-align-center bg-orange-100 
            boderradius--half padding--xxxs'>
                <Image className='full-width-height' src={EarthSvg} />
            </div>

            <div className="margin-lr--xxxs">
                <h4 className='margin--zero color-grey-700'>{title}</h4>
                <p className='margin--zero color-grey-500 large-text margin-t--xxxs'>{text}</p>
            </div>

            <div className="margin-r--xxs">
                <a href={btnUrl}>
                    <PrimaryButton title={btnText} />
                </a>
            </div>

        </div>
    )
}

export default Banner