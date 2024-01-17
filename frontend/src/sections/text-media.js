import TopWave from '../components/wave/top-wave'
import BottomWave from '../components/wave/bottom-wave'
import Image from 'next/image'
import DefaultImage from '../features/img-default.svg'
import PrimaryButton from '../components/buttons/primary-button'
import SecondaryButton from '../components/buttons/secondary-button'
import '../styles/sections/text-and-media.scss'


const TextAndMedia = ({ data }) => {

    return(
        <div className="text-and-media-body">
            <TopWave bgColor={data.bgColor} />

                <div className="text-and-media-container">

                    <div className='text-and-media-content'>
                        <p className='sub-heading'>{data.subHeading}</p>
                        <h2>{data.heading}</h2>
                        <p>{data.description}</p>
                        <div className='text-and-media-content-button-container' >
                            <PrimaryButton title={data.primaryBtnTitle} />
                            <SecondaryButton title={data.secondaryBtnTitle} />
                        </div>
                    </div>

                    <div className='text-and-media-content'>
                        {(data.imgUrl !== null && data.imgUrl !== undefined) ? 
                        <Image className='text-and-media-image' src={data.imgUrl} /> 
                        : 
                        <Image className='text-and-media-image' src={DefaultImage} />}
                    </div>

                </div>

            <BottomWave bgColor={data.bgColor} />
        </div>
    )
}

export default TextAndMedia