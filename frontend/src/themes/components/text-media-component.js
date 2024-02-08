import TopWave from './waves/top-wave.js'
import BottomWave from './waves/bottom-wave.js'
import Image from 'next/image'
import DummyImage1 from '../sources/assets/graphics/placeholder/dummy-image1.svg'
import PrimaryButton from './buttons/primary-button.js'
import SecondaryButton from './buttons/secondary-button.js'
import DocumentRenderer from '../sources/js/document-renderer.js'
import '../sources/scss/components/text-and-media.scss'
import '../sources/scss/base/utils.scss'

// ta reda på vilka färger ska användas (!)


export default function TextMediaComponent({ content }) {

    var bgColorClass, fillColorClass

    /* "bg" is for the body, and "fill" is for the wave */
    if (content.backgroundColor === 'ORANGE') {
        bgColorClass = 'bg-orange-50'
        fillColorClass = 'fill-orange-50'
    } else if (content.backgroundColor === 'YELLOW') {
        bgColorClass = 'bg-yellow-50'
        fillColorClass = 'fill-yellow-50'
    } else {
        bgColorClass = 'bg-purple-50'
        fillColorClass = 'fill-purple-50'
    }

    return (
        <div className="text-and-media-body bg-transparent" >

            {(content.border === 'TOP' || content.border === 'TOPBOTTOM') ? // top wave
                <TopWave fillColorClass={fillColorClass} />
                :
                null
            }

            <div className={`text-and-media-container flex flex-row flex-nowrap padding-tb--xxl margin-tb--xxxs-negative ${bgColorClass}
                ${(content.imagePosition === 'LEFT') ? 'flex-reverse-row' : null}`} >

                <div className='text-content flex flex-column flex-nowrap margin-lr--xl'>

                    <h2 className='sub-heading-m margin-t--xxxs margin-b--zero'>{content.subHeading}</h2>
                    <h3 className='heading2-lineheight-l margin--zero'>{content.title}</h3>

                    <DocumentRenderer content={content.preamble} />

                    <p>{content.description}</p>

                    <div className='button-container flex flex-row flex-nowrap flex-justify-start flex-align-center' >

                        {content.cta1 && content.cta1.url && content.cta1.anchorText && (
                            <a href={content.cta1.url}>
                                <PrimaryButton title={content.cta1.anchorText} />
                            </a>
                        )}
                        
                        {content.cta2 && content.cta2.url && content.cta2.anchorText && (
                            <a className='no-decoration' href={content.cta2.url}>
                                <SecondaryButton title={content.cta2.anchorText} />
                            </a>
                        )}
                    </div>
                </div>

                <div className='media-content flex flex-justify-center flex-align-center'>

                    {(content.imgUrl !== null && content.imgUrl !== undefined) ? // image
                        <Image className='obj-cover' src={content.imgUrl} />
                        :
                        <Image className='obj-cover' src={DummyImage1} />}
                </div>

            </div>

            {(content.border === 'BOTTOM' || content.border === 'TOPBOTTOM') ? // bottom wave
                <BottomWave fillColorClass={fillColorClass} />
                :
                null
            }

        </div>
    )
}