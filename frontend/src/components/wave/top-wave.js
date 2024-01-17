import '../../styles/components/top-wave.scss'
import TopWaveSvg from '../../features/top-wave.svg'
import Image from 'next/image'


const TopWave = ({bgColor}) => {

    // göra något åt olika background color.... 

    return (
        <Image id='top-wave' src={TopWaveSvg} />
    )
}

export default TopWave