import '../../styles/components/waves/bottom-wave.scss'
import WaveSvg from '../../features/waves/wave.svg'
import Image from 'next/image'

const BottomWave = ({bgColor}) => {

    return (
        <Image className='bottom-wave' style={{ backgroundColor: bgColor }} src={WaveSvg} />
    )
}

export default BottomWave