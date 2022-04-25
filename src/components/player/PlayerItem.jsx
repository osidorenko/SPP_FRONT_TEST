import React, {useState, useEffect, useRef} from "react";
import start from "./play.png";
import stop from "./stop.png";
import next from "./next.png";
import prev from "./prev.png";
import AudioControls from "./AudioConrols";
import {render} from "react-dom";

const PlayerItem = ({song_data, song}) => {
    const tracks = [
        {
            title: "",
            artist: "string",
            audioSrc: "string",
            image: "string",
            color: "string",
        },
    ]
    const [trackIndex, setTrackIndex] = useState(0);
    const [trackProgress, setTrackProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const {title, artist, color, image, audioSrc} = tracks[trackIndex];

    const toPrevTrack = () => {
        if (trackIndex - 1 < 0) {
            setTrackIndex(tracks.length - 1);
        } else {
            setTrackIndex(trackIndex - 1);
        }
    }

    const toNextTrack = () => {
        if (trackIndex < tracks.length - 1) {
            setTrackIndex(trackIndex + 1);
        } else {
            setTrackIndex(0);
        }
    }
    const audioRef = useRef(new Audio("http://localhost:8100/files/music/" + song_data.songName));
    const intervalRef = useRef();
    const isReady = useRef(false);
    const {duration} = audioRef.current;


    const startTimer = () => {
        // Clear any timers already running
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            if (audioRef.current.ended) {
                toNextTrack();
            } else {
                setTrackProgress(audioRef.current.currentTime);
            }
        }, [1000]);
    }
    useEffect(() => {
        audioRef.current.pause();
        audioRef.current = new Audio("http://localhost:8100/files/music/" + song_data.songName);
        setTrackProgress(audioRef.current.currentTime);
        if (isReady.current) {
            audioRef.current.play();
            setIsPlaying(true);
            startTimer();
        }
    }, [trackIndex]);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
            startTimer();
        } else {
            clearInterval(intervalRef.current);
            audioRef.current.pause();
        }
    }, [isPlaying]);
    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
            startTimer();
        } else {
            clearInterval(intervalRef.current);
            audioRef.current.pause();
        }
    }, [isPlaying]);
    useEffect(() => {
        // Pause and clean up on unmount
        return () => {
            audioRef.current.pause();
            clearInterval(intervalRef.current);
        }
    }, []);
    useEffect(() => {
        audioRef.current.pause();
        audioRef.current = new Audio("http://localhost:8100/files/music/" + song_data.songName);
        setTrackProgress(audioRef.current.currentTime);
        if (isReady.current) {
            audioRef.current.play();
            setIsPlaying(true);
            startTimer();
        }
    }, [trackIndex]);


    const onScrub = (value) => {
        // Clear any timers already running
        clearInterval(intervalRef.current);
        audioRef.current.currentTime = value;

        setTrackProgress(audioRef.current.currentTime);
    }

    const onScrubEnd = () => {
        // If not already playing, start
        if (!isPlaying) {
            setIsPlaying(true);
        }
        startTimer();
    }
    const currentPercentage = duration ? `${(trackProgress / duration) * 100}%` : '0%';
    const trackStyling = `-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))`;


    return (
        <div className="audio-player">
            <img className="audio-control-prev" src={prev} width={25} height={25}/>
            {isPlaying ? (
                <img onClick={event => {
                    setIsPlaying(!isPlaying)
                }} className="audio-control-pl_ps" src={stop} width={50} height={50}/>


            ) : (
                <img onClick={event => {
                    setIsPlaying(!isPlaying)
                }} className="audio-control-pl_ps" src={start} width={50} height={50}/>
            )
            }
            <img className="audio-control-next" src={next} width={25} height={25}/>
            <h6 className="audio-current">{((trackProgress | 0) / 60) | 0}:{
                ((trackProgress | 0) % 60) > 9 ? ((trackProgress | 0) % 60) : ("0" + (trackProgress | 0) % 60)
            }</h6>
            <div className="progress_div">
                <input
                    type="range"
                    value={trackProgress}
                    step="1"
                    min="0"
                    max={duration ? duration : `${duration}`}
                    className="progress"
                    onChange={(e) => onScrub(e.target.value)}
                    onMouseUp={onScrubEnd}
                    onKeyUp={onScrubEnd}
                />
            </div>
            <h6 className="audio-total">{((duration | 0) / 60) | 0}:{
                ((duration | 0) % 60) > 9 ? ((duration | 0) % 60) : ("0" + (duration | 0) % 60)
            }</h6>
            <div className="track-info">
                {/*<img
                    className="artwork"
                    src={"http://localhost:8100//files/photo/" + song_data.picture.name}
                    alt={`track artwork for ${song.name} by ${song.author}`
                    }
                />
                <h2 className="title">{song.name}</h2>
                <h3 className="artist">{song.author}</h3>*/
                }

                {/*{isPlaying ? (
                    <button onClick={event => {
                        setIsPlaying(!isPlaying)
                    }}>stop<img/>
                    </button>
                ) : (
                    <button onClick={event => {
                        setIsPlaying(!isPlaying)
                    }}>start<img/>
                    </button>
                )
                }*/}
            </div>
        </div>
    )

}
export default PlayerItem