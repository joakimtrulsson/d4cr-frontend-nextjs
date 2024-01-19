import '../../../themes/sources/scss/components/waves/bottom-wave.scss'
import WaveSvg from '../../sources/assets/graphics/wave.svg'
import Image from 'next/image'

const BottomWave = ({bgColor}) => {

    return (
        <Image className='bottom-wave' style={{ backgroundColor: bgColor }} src={WaveSvg} />
    )
}

export default BottomWave