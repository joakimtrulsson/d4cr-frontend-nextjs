import '../../styles/components/buttons/navbar-secondary-button.scss'
import ArrowLeft from '../../features/buttons/secondary-btn-arrow-left.svg'
import ArrowRight from '../../features/buttons/secondary-btn-arrow-right.svg'
import Image from 'next/image'

const SecondaryButton = ({ title }) => {

    return (
        <div class="secondary-button" onClick={null}>
            <Image src={ArrowLeft} />
            <button>{title}</button>
            <Image src={ArrowRight} />
        </div>
    )
}

export default SecondaryButton