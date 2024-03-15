import PrimaryButton from '../themes/components/buttons/primary-button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import getColorCode from '../themes/sources/js/color-code'
import { DocumentRenderer } from '@keystone-6/document-renderer'

export default function Banner({ content }) {

    const { library } = require('@fortawesome/fontawesome-svg-core');
    library.add(fas)

    return (
        <div className='banner flex flex-row flex-justify-between flex-align-center bg-orange-50 
        padding--s width--l min-width-35 borderradius--xxs'>

            <div className='icon-wrapper flex flex-justify-center flex-align-center bg-orange-100 
             borderradius--half padding--s margin-l--xxs'>
                <FontAwesomeIcon icon={['fas', content.iconName]} color={getColorCode('orange-500')} size="lg" />
            </div>

            <div className="margin-lr--s">
                <h4 className='margin--zero color-grey-700'>{content.title}</h4>
                <DocumentRenderer document={content.preamble} />
            </div>

            <div className="margin-r--xxs">
                <a href={content.cta.url}>
                    <PrimaryButton title={content.cta.anchorText} />
                </a>
            </div>

        </div>
    )
}
