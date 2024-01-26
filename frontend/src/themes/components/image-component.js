import Image from 'next/image'
import '../sources/scss/base/utils.scss'
import '../sources/scss/components/image-component.scss'

const ImageComponent = ({images}) => {

    var containerClass;

    if (images.length === 3) {
        containerClass = 'image-container-3';
    } else if (images.length === 2) {
        containerClass = 'image-container-2';
    } else {
        containerClass = 'image-container-1';
    }

    return (
        <div className={`${containerClass} flex flex-row flex-justify-center flex-align-center
        padding-tb--m `}>

            {images.map((image, index)=> (
                <div className='image-wrapper borderradius--xxs'> 
                    <Image className='center-image' key={index} src={image} />
                </div>
            ))}

        </div>
    )
}

export default ImageComponent