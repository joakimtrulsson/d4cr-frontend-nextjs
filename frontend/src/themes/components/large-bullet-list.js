import '../sources/scss/components/large-bullet-list.scss'
import Image from 'next/image'
import ArrowRight from '../sources/assets/graphics/icons/arrow-right.svg'
import data from '../../database/sections-data/large-bullet-list'

const LargeBulletList = () => {

    if (!data || !data.sections || data.sections.length === 0) {
        return null;
    }

    const { title, subHeader, bullets } = data.sections[0];

    return (
        <div className='large-bullet-list-container'>
            <h2>{title}</h2>
            <p>{subHeader}</p>

            {bullets.map((bullet, index) => {
                return (
                    <div className='bullet-content' key={index} >
                        <Image src={ArrowRight} />
                        <p>{bullet.bodyText[0].children[0].text}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default LargeBulletList