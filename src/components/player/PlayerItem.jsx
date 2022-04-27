import React, {useState, useEffect, useRef} from "react";
import start from "./play.png";
import stop from "./stop.png";
import next from "./next.png";
import prev from "./prev.png";
import AudioControls from "./AudioConrols";
import {render} from "react-dom";
import musicStore from "../../store/MusicStore"
import {inject, observer} from "mobx-react";

let isHavePlaying = true
const PlayerItem = inject('musicStore')(observer(({songs_data}) => {
    /*    const [tracks, setTracks] = useState([
            {
                title: " ",
                artist: " ",
                audioSrc: " ",
                image: " ",
                color: " "
            }
        ])*/

    /*useEffect(() => {
            musicStore.audioRef.current.pause();
            if (musicStore.songs.length === 0) {
                isHavePlaying = false;
            } else {
                let tracks1 = []
                isHavePlaying = true
                musicStore.songs.map((song_data) =>
                    tracks1.push({
                        title: song_data.song.name,
                        artist: song_data.song.author,
                        audioSrc: song_data.songName,
                        image: song_data.picture.name,
                        color: "string",
                    })
                )

                musicStore.tracks = (tracks1)
                musicStore.audioRef.current = new Audio("http://localhost:8100/files/music/" + tracks1[0].audioSrc);
                musicStore.trackProgress = (musicStore.audioRef.current.currentTime);
                musicStore.audioRef.current.play();
                musicStore.isPlaying = (true)

            }
        }, [musicStore.songs]
    )*/


    /*

        const [trackIndex, setTrackIndex] = useState(0);
        const [trackProgress, setTrackProgress] = useState(0);
        const [isPlaying, setIsPlaying] = useState(false);

        const {title, artist, color, image, audioSrc} = tracks[trackIndex];
        const audioRef = useRef(new Audio("http://localhost:8100/files/music/" + audioSrc));
        const intervalRef = useRef();
        const isReady = useRef(false);

    */


    const toPrevTrack = () => {
        if (musicStore.trackIndex - 1 < 0) {
            musicStore.trackIndex = (musicStore.tracks.length - 1);
        } else {
            musicStore.trackIndex = (musicStore.trackIndex - 1);
        }
        musicStore.isPlaying = (false)

    }

    const toNextTrack = () => {
        if (musicStore.trackIndex < musicStore.tracks.length - 1) {
            musicStore.trackIndex = (musicStore.trackIndex + 1);
        } else {
            musicStore.trackIndex = (0);
        }
        musicStore.isPlaying = false
    }


    const startTimer = () => {
        // Clear any timers already running
        clearInterval(musicStore.intervalRef.current);
        musicStore.intervalRef.current = setInterval(() => {
            if (musicStore.audioRef.current.ended) {
                toNextTrack();
            } else {
                musicStore.trackProgress = (musicStore.audioRef.current.currentTime);
            }
        }, [1000]);
    }


    /*useEffect(() => {
        if (musicStore.isPlaying) {
            musicStore.audioRef.current.play();
            startTimer();
        } else {
            clearInterval(musicStore.intervalRef.current);
            musicStore.audioRef.current.pause();
        }
    }, [musicStore.isPlaying]);


    useEffect(() => {
        // Pause and clean up on unmount
        return () => {
            musicStore.audioRef.current.pause();
            clearInterval(musicStore.intervalRef.current);
        }
    }, []);
    useEffect(() => {
        musicStore.audioRef.current.pause();
        musicStore.audioRef.current = new Audio("http://localhost:8100/files/music/" + musicStore.audioSrc);
        musicStore.trackProgress = (musicStore.audioRef.current.currentTime);
        musicStore.audioRef.current.play();
        musicStore.isPlaying = (true);
        startTimer();

    }, [musicStore.trackIndex]);
*/

    const onScrub = (value) => {
        // Clear any timers already running
        clearInterval(musicStore.intervalRef);
        musicStore.audioRef.currentTime = value;
        musicStore.trackProgress = musicStore.audioRef.currentTime
        musicStore.startTimer()

    }
    /*const {duration} = musicStore.audioRef;*/

    const onScrubEnd = () => {
        // If not already playing, start

        if (!musicStore.isPlaying) {

            musicStore.isPlaying = (true);
        }
        startTimer();
    }
    const currentPercentage = musicStore.duration ? `${(musicStore.trackProgress / musicStore.duration) * 100}%` : '0%';
    /*const trackStyling = `-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))`;*/

    //init()
    return (
        musicStore.isHavePlaying ? (<div className="audio-player">
            <div className="audio-info">
                <img
                    className="artwork"
                    src={"http://localhost:8100/files/photo/" + musicStore.image}
                    alt={`track artwork for ${musicStore.title} by ${musicStore.artist}`
                    }
                />
                <div>
                    <h5 className="title">{musicStore.title}</h5>
                    <h5 className="artist">{musicStore.artist}</h5>
                </div>

            </div>

            <div className="audio-player-control">
                <img onClick={() => musicStore.toPrevTrack()} className="audio-control-prev" src={prev} width={25}
                     height={25}/>
                {musicStore.isPlaying ? (
                    <img onClick={event => {
                        musicStore.pauseMethod()
                        /*musicStore.isPlaying=!musicStore.isPlaying*/
                    }} className="audio-control-pl_ps" src={stop} width={50} height={50}/>
                ) : (
                    <img onClick={event => {
                        musicStore.playMethod()
                        /*musicStore.isPlaying = !musicStore.isPlaying*/
                    }} className="audio-control-pl_ps" src={start} width={50} height={50}/>
                )
                }
                <img onClick={() => musicStore.toNextTrack()} className="audio-control-next" src={next} width={25}
                     height={25}/>
                <h6 className="audio-current">{((musicStore.trackProgress | 0) / 60) | 0}:{
                    ((musicStore.trackProgress | 0) % 60) > 9 ? ((musicStore.trackProgress | 0) % 60) : ("0" + (musicStore.trackProgress | 0) % 60)
                }</h6>
                <div className="progress_div">
                    <input
                        type="range"
                        value={musicStore.trackProgress}
                        step="1"
                        min="0"
                        max={musicStore.audioRef.duration ? musicStore.audioRef.duration : `${musicStore.audioRef.duration}`}
                        className="progress"
                        onChange={(e) => onScrub(e.target.value)}
                        /*onMouseUp={onScrubEnd}
                        onKeyUp={onScrubEnd}*/
                    />
                </div>
                <h6 className="audio-total">{((musicStore.audioRef.duration | 0) / 60) | 0}:{
                    ((musicStore.audioRef.duration | 0) % 60) > 9 ? ((musicStore.audioRef.duration | 0) % 60) : ("0" + (musicStore.audioRef.duration | 0) % 60)
                }</h6>
            </div>

        </div>) : (
            <div>

            </div>
        )

    )

}))
export default PlayerItem