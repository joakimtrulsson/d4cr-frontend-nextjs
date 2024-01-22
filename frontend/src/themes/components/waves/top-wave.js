import '../../../themes/sources/scss/components/waves/top-wave.scss'
import WaveSvg from '../../sources/assets/graphics/wave.svg'
import Image from 'next/image'


const TopWave = ({bgColor}) => {

    return (
        <Image className='top-wave' style={{ backgroundColor: bgColor }} src={WaveSvg} />
    )
}

export default TopWave