const VideoPlayer = ({video}) => {

    const videoData = video
    console.log(videoData)
    return (
    <main>
        {/* {console.log(videoData)} */}
        <video width="320" height="240" controls preload="none">
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