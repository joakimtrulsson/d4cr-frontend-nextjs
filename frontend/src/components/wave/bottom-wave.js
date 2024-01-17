import '../../styles/components/bottom-wave.scss'
import BottomWaveSvg from '../../features/bottom-wave.svg'
import Image from 'next/image'

const BottomWave = ({bgColor}) => {

    return (
        <div className='bottom-wave'>
            <Image className='bottom-wave' src={BottomWaveSvg} />
        </div>
    )
}

export default BottomWave