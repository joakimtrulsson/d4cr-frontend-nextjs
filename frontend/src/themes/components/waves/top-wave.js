import '../../sources/scss/base/layout.scss'
import WaveSvg from '../../sources/assets/graphics/wave.svg'
import Image from 'next/image'


const TopWave = ({bgColor}) => {

    return (
        <Image className='coverage' style={{ backgroundColor: '#fff' }} src={WaveSvg} />
    )
}

export default TopWave