import TopWave from './waves/top-wave.jsx'
import BottomWave from './waves/bottom-wave.jsx'
import PrimaryButton from './buttons/primary-button.jsx'
import SecondaryButton from './buttons/secondary-button.jsx'
import Link from 'next/link'
import Image from 'next/image'
import { DocumentRenderer } from '@keystone-6/document-renderer'

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

            <div className={`text-and-media-container flex flex-row flex-nowrap flex-justify-around flex-align-center padding-tb--xxl padding-lr--xs margin-tb--xxxs-negative ${bgColorClass}

                ${(content.imagePosition === 'LEFT') ? 'flex-reverse-row' : null}`} > { /* check media's position */}

                <div className='text-content flex flex-column flex-nowrap margin-lr--s'>

                    <h2 className='sub-heading-m margin-t--xxxs margin-b--zero color-orange-600'>{content.subHeading}</h2>
                    <h3 className='heading2-lineheight-l margin--zero color-orange-800'>{content.title}</h3>

                    <DocumentRenderer document={content.preamble} />

                    {(content.cta1 || content.cta2) && (

                        <div className='button-container flex flex-row flex-nowrap flex-justify-start flex-align-center margin-tb--xxxs' >

                            {content.cta1 && content.cta1.url && content.cta1.anchorText && ( /* primary button */
                                <Link href={content.cta1.url} className='margin-r--xxxs'>
                                    <PrimaryButton title={content.cta1.anchorText} />
                                </Link>
                            )}

                            {content.cta2 && content.cta2.url && content.cta2.anchorText && ( /* secondary button */
                                <Link className='no-decoration' href={content.cta2.url}>
                                    <SecondaryButton title={content.cta2.anchorText} />
                                </Link>
                            )}
                        </div>
                    )}
                    
                </div>

                <div className='media-content flex flex-justify-center flex-align-center borderradius--xxs'>
                    {content.image.url && <Image className='center-image' src={content.image.url} alt={content.image.altText} fill={true} /> /* image */}
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