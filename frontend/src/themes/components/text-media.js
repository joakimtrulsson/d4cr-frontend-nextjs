import TopWave from './waves/top-wave'
import BottomWave from './waves/bottom-wave'
import Image from 'next/image'
import DummyImage1 from '../sources/assets/graphics/placeholder/dummy-image1.svg'
import PrimaryButton from './buttons/primary-button'
import SecondaryButton from './buttons/secondary-button'
import '../sources/scss/components/text-and-media.scss'
import '../sources/scss/base/utils.scss'


const TextAndMedia = ({ data }) => {

    return (
        <div className="text-and-media-body" >

            { (data.border === 'TOP' || data.border === 'BOTH' ) ? <TopWave bgColor={data.backgroundColor} /> : null }

            <div className={`text-and-media-container flex flex-row flex-nowrap 
            ${ data.isImagePositionLeft ? 'flex-reverse-row' : null}`}
            style={{ backgroundColor: data.backgroundColor }} >

                <div className='text-content flex flex-column flex-nowrap'>
                    <h2 className='sub-heading-m'>{data.subHeading}</h2>
                    <h3 className='heading2-lineheight-l'>{data.title}</h3>

                    { data.preamble.map((font, fontIndex) => (
                        
                        font.children.map((child, childIndex) => (

                            font.type === "paragraph" ? 
                            ( <p key={fontIndex}>{font.children[0].text}</p> ) : null )
                            
                        )))
                    }

                    <p>{data.description}</p>
                    <div className='button-container flex flex-row flex-nowrap flex-justify-start' >
                        <a href={data.cta[1].url}>
                            <PrimaryButton title={data.cta[0].anchorText} />
                        </a>
                        <a href={data.cta[1].url}>
                            <SecondaryButton title={data.cta[1].anchorText} />
                        </a>
                    </div>
                </div>

                <div className='media-content flex flex-justify-center flex-align-center'>
                    {(data.imgUrl !== null && data.imgUrl !== undefined) ?
                        <Image className='obj-cover' src={data.imgUrl} />
                        :
                        <Image className='obj-cover' src={DummyImage1} />}
                </div>

            </div>

            { (data.border === 'BOTTOM' || data.border === 'BOTH' ) ? <BottomWave bgColor={data.backgroundColor} /> : null }

        </div>
    )
}

export default TextAndMedia