import VideoPlayer from '../components/video-player.js'

const Hero = () => {

    const heroTitle = "Designing for children's right"
    const heroDescription = "lorem ewfijjer fe fewjop jp jpowef jopefj poewjfop jpofew jopfejop jofpew opjfewjpo fewjp"

    return(
        <div className="hero">
            <div className="hero-container">
                
                <h1>{heroTitle}</h1>
                <p>{heroDescription}</p>

                {
                    // fix button 1
                    // fix button 2 
                }

            </div>
            
            <div className="hero-player">
                <VideoPlayer />
            </div>
        </div>
    )
}

export default Hero