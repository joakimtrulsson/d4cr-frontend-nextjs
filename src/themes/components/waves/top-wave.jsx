import '../../sources/scss/base/utils.scss'
import '../../sources/scss/variables/color-variables.scss'


const TopWave = ({fillColorClass}) => {

    return (
        <svg
            className='full-width-height obj-cover bg-transparent'
            width="1600"
            height="80"
            viewBox="0 0 1600 80"
            xmlns="http://www.w3.org/2000/svg"
            >
            <path className={`${fillColorClass}`}
            d="M0 23.4684H53.3333C106.667 23.4684 213.333 23.4684 320 17.2862C426.667 11.104 533.333 -1.2605 640 0.285055C746.667 1.83061 853.333 17.2862 960 32.7418C1066.67 48.1973 1173.33 63.6529 1280 66.744C1386.67 69.8351 1493.33 60.5618 1546.67 55.9251L1600 51.2884V79.1085H1546.67C1493.33 79.1085 1386.67 79.1085 1280 79.1085C1173.33 79.1085 1066.67 79.1085 960 79.1085C853.333 79.1085 746.667 79.1085 640 79.1085C533.333 79.1085 426.667 79.1085 320 79.1085C213.333 79.1085 106.667 79.1085 53.3333 79.1085H0V23.4684Z"
            />
        </svg>
    )
}

export default TopWave

