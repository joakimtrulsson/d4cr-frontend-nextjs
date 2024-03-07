import VideoPlayer from "./videoplayer"

const Hero = ({ prop }) => {
    const propData = prop

    console.log('hero', prop.ctaOneUrl, prop.ctaTwoUrl)

    return (
        <main>

            <h1>{propData.ctaTwoUrlAnchorText}</h1>
            <h4>{propData.heroPreamble.document[0].children[0].text}</h4>

            <h4>{propData.ctaOneAnchorText}</h4>

            <h4>{propData.ctaTwoUrlAnchorText}</h4>

            <VideoPlayer video={propData.heroVideo} />

        </main>
    )
}

export default Hero