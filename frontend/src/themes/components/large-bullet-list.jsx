import '../sources/scss/components/large-bullet-list.scss'
import '../sources/scss/base/utils.scss'
import WYSIWYG from './wysiwyg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

export default function LargeBulletList({ content }) {

    const { library, config } = require('@fortawesome/fontawesome-svg-core');
    library.add(fas)

    const iconColor = '#FC7C37'

    return (
        <div className='large-bullet-list-container min-width-25 flex flex-column  flex-align-center'>
            <h2>{content.title}</h2>
            <p className='large-text'>{content.subHeader}</p>

            {content.bullets.map((bullet, index) => {
                return (
                    <div className='bullet-content full-width-height max-width-45 flex flex-row flex-align-center flex-justify-start 
                    bg-grey-25 borderradius--xxs padding--xs' key={index} >
                        
                        { (content.listType === 'ORDERED') ? 
                            <FontAwesomeIcon icon={['fas', 'arrow-right']} color={iconColor} />
                            : <FontAwesomeIcon icon={['fas', `${index+1}`]} color={iconColor} />
                        }
                        <WYSIWYG content={bullet.bodyText} />
                    </div>
                )
            })}
        </div>
    )
}
