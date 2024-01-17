import '../../styles/components/bottom-wave.scss'
import BottomWaveSvg from '../../features/bottom-wave.svg'
import Image from 'next/image'

const BottomWave = ({bgColor}) => {

    return (
        <Image className='bottom-wave' src={BottomWaveSvg} />
    )
}

export default BottomWave