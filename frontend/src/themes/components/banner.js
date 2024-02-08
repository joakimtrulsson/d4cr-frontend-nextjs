import '../sources/scss/base/utils.scss'
import '../sources/scss/components/banner.scss'
import PrimaryButton from './buttons/primary-button'
import DocumentRenderer from '../sources/js/document-renderer.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

export default function Banner({ content }) {

    const { library, config } = require('@fortawesome/fontawesome-svg-core');
    library.add(fas)

    const iconColor = '#FC7C37'

    return (
        <div className='banner flex flex-row flex-justify-between flex-align-center bg-orange-50 
        padding--s max-width-45 borderradius--xxs'>

            <div className='icon-wrapper flex flex-justify-center flex-align-center bg-orange-100 
            borderradius--half padding--xs'>

                <FontAwesomeIcon icon={['fas', content.iconName]} color={iconColor} size="lg" />

            </div>

            <div className="margin-lr--xs">
                <h4 className='margin--zero color-grey-700'>{content.title}</h4>
                <DocumentRenderer className='margin--zero color-grey-500 large-text margin-t--xxxs' content={content.preamble} />
            </div>

            <div className="margin-r--xxs">
                <a href={content.cta.url}>
                    <PrimaryButton title={content.cta.anchorText} />
                </a>
            </div>

        </div>
    )
}
