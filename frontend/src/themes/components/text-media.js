import TopWave from './waves/top-wave'
import BottomWave from './waves/bottom-wave'
import Image from 'next/image'
import DummyImage1 from '../sources/assets/graphics/placeholder/dummy-image1.svg'
import PrimaryButton from './buttons/primary-button'
import SecondaryButton from './buttons/secondary-button'
import '../sources/scss/components/text-and-media.scss'
import '../sources/scss/base/utils.scss'


const TextAndMedia = ({ data }) => {

    var bgColorClass, fillColorClass

    // ta reda på vilka färger ska användas (!)

    /* "bg" is for the body, and "fill" is for the wave */
    if (data.backgroundColor === 'orange') {
        bgColorClass = 'bg-orange-50'
        fillColorClass = 'fill-orange-50'
    } else if (data.backgroundColor === 'yellow') {
        bgColorClass = 'bg-yellow-50'
        fillColorClass = 'fill-yellow-50'
    } else {
        bgColorClass = 'bg-purple-50'
        fillColorClass = 'fill-purple-50'
    }

    // bg-transparent

    return (
        <div className="text-and-media-body bg-transparent margin-tb--xxs" >

            {(data.border === 'TOP' || data.border === 'BOTH') ?
                <TopWave fillColorClass={fillColorClass} />
                :
                null
            }

            <div className={`text-and-media-container flex flex-row flex-nowrap padding-tb--xxl margin-tb--xxxs-negative ${bgColorClass}
            ${data.isImagePositionLeft ? 'flex-reverse-row' : null}`} >

                <div className='text-content flex flex-column flex-nowrap margin-lr--xl'>
                    <h2 className='sub-heading-m margin-t--xxxs margin-b--zero'>{data.subHeading}</h2>
                    <h3 className='heading2-lineheight-l margin--zero'>{data.title}</h3>

                    {data.preamble.map((font, fontIndex) => (

                        font.children.map((child, childIndex) => (

                            font.type === "paragraph" ?
                                (<p key={fontIndex} className='description-text margin-b--m'>{font.children[0].text}</p>) : null)

                        )))
                    }

                    <p>{data.description}</p>

                    <div className='button-container flex flex-row flex-nowrap flex-justify-start flex-align-center' >
                        <a href={data.cta[1].url}>
                            <PrimaryButton title={data.cta[0].anchorText} />
                        </a>
                        <a className='no-decoration' href={data.cta[1].url}>
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

            {(data.border === 'BOTTOM' || data.border === 'BOTH') ?
                <BottomWave fillColorClass={fillColorClass} />
                :
                null
            }

        </div>
    )
}

export default TextAndMedia