import WaveSvg from '../../sources/assets/graphics/wave.svg'
import Image from 'next/image'

const BottomWave = ({bgColor}) => {

    return (
        <Image className='coverage updown-reverse' style={{ backgroundColor: '#fff' }} src={WaveSvg} />
    )
}

export default BottomWave