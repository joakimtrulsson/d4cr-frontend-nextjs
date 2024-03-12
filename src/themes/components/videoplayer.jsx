import React from 'react';
import Image from 'next/image';
import PlayBtn from "../sources/assets/graphics/buttons/play.png"
import PlayBg from "../sources/assets/graphics/buttons/play-bg.png"

const VideoPlayer = ({ video }) => {

    const videoData = video
    console.log(videoData)
    return (
        <main className="video-container">
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
            <button className="custom-play-button">
                <Image className="play-btn" src={PlayBtn} width={80} height={80}/>
                <Image className="play-bg"  src={PlayBg} width={80} height={80} />
            </button>
        </main>
    )
}

export default VideoPlayer