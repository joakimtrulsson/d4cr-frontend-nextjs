const VideoPlayer = ({video}) => {

    const videoData = video
    console.log(videoData)
    return (
    <main>
        {/* {console.log(videoData)} */}
        <video className="video-player" width="320" height="260" controls>
            <source src={videoData.url} type="video/mp4" />
            <track
                src="/path/to/captions.vtt"
                kind="subtitles"
                srcLang="en"
                label="English"
            />
            Your browser does not support the video tag.
        </video>
    </main>
    )
}

export default VideoPlayer