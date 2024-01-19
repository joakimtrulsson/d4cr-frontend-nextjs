import TopWave from './waves/top-wave'
import BottomWave from './waves/bottom-wave'
import Image from 'next/image'
import DummyImage1 from '../sources/assets/graphics/placeholder/dummy-image1.svg'
import PrimaryButton from './buttons/primary-button'
import SecondaryButton from './buttons/secondary-button'
import '../sources/scss/components/text-and-media.scss'


const TextAndMedia = ({ data }) => {

    return (
        <div className="text-and-media-section">

            <TopWave bgColor={data.bgColor} />

            <div className="text-and-media-container">

                <div className='text-content'>
                    <p className='sub-heading'>{data.subHeading}</p>
                    <h2>{data.heading}</h2>
                    <p>{data.description}</p>
                    <div className='button-container' >
                        <PrimaryButton title={data.primaryBtnTitle} />
                        <SecondaryButton title={data.secondaryBtnTitle} />
                    </div>
                </div>

                <div className='media-content'>
                    {(data.imgUrl !== null && data.imgUrl !== undefined) ?
                        <Image className='media-image' src={data.imgUrl} />
                        :
                        <Image className='media-image' src={DummyImage1} />}
                </div>

            </div>

            <BottomWave bgColor={data.bgColor} />

        </div>
    )
}

export default TextAndMedia