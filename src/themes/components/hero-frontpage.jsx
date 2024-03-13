import VideoPlayer from "./videoplayer"
import PrimaryButton from "./buttons/primary-button"
import Link from 'next/link'


const Hero = ({ prop }) => {
    const propData = prop

    console.log('hero', propData)
    ///börja med mobile friendly
    return (
        <main>
            <div className="hero-container">
                <div className="text-div">
                    <h1 className="title">{propData.heroTitle}</h1>
                    <h4 className="preamble">{propData.heroPreamble.document[0].children[0].text}</h4>
                    <div className="buttons-bottom flex flex-row">
                        <Link className="link" href='../../chapters/berlin'>
                            <PrimaryButton title={propData.ctaOneAnchorText} />
                        </Link>
                        <Link  className="link"  href='../../chapters/berlin'>
                            <PrimaryButton title={propData.ctaTwoUrlAnchorText} />
                        </Link>

                    </div>
                </div>
                <div className="video-div">
                    <div className="ball-1"></div>
                    <div className="ball-3"></div>
                    <div className="ball-2"></div>
                    
                    {propData.heroVideo && <VideoPlayer video={propData.heroVideo} />  /* la till denna funktion så det går att deploya webbsidan */ } 
                </div>
            </div>
        </main>
    )
}

export default Hero