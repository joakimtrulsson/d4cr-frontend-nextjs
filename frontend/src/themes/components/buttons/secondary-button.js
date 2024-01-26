import '../../sources/scss/components/buttons/secondary-button.scss'
import ArrowLeft from '../../../themes/sources/assets/graphics/buttons/secondary-btn-arrow-left.svg'
import ArrowRight from '../../../themes/sources/assets/graphics/buttons/secondary-btn-arrow-right.svg'
import Image from 'next/image'

const SecondaryButton = ({ title }) => {

    return (
        <div className="secondary-button flex flex-row flex-nowrap" onClick={null}>
            <Image src={ArrowLeft} />
            <button className='flex flex-align-center'>{title}</button>
            <Image src={ArrowRight} />
        </div>
    )
}

export default SecondaryButton