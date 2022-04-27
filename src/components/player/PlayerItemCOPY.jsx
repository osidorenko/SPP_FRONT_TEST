import React, {useState, useEffect, useRef} from "react";
import start from "./play.png";
import stop from "./stop.png";
import next from "./next.png";
import prev from "./prev.png";
import AudioControls from "./AudioConrols";
import {render} from "react-dom";

import {inject, observer} from "mobx-react";

let isHavePlaying = true
const PlayerItemCOPY = ({songs_data}) => {
    const [tracks, setTracks] = useState([
        {
            title: " ",
            artist: " ",
            audioSrc: " ",
            image: " ",
            color: " "
        }
    ])

    useEffect(() => {
            audioRef.current.pause();
            if (songs_data.length === 0) {
                isHavePlaying = false;
            } else {
                let tracks1 = []
                isHavePlaying = true
                songs_data.map((song_data) =>
                    tracks1.push({
                        title: song_data.song.name,
                        artist: song_data.song.author,
                        audioSrc: song_data.songName,
                        image: song_data.picture.name,
                        color: "string",
                    })
                )

                setTracks(tracks1)
                audioRef.current = new Audio("http://localhost:8100/files/music/" + tracks1[0].audioSrc);
                setTrackProgress(audioRef.current.currentTime);
                audioRef.current.play();
                setIsPlaying(true)

            }
        }, [songs_data]
    )

    /*function init() {
        if (songs_data.length === 0) {
            isHavePlaying = false;
        } else {
            tracks.length = 0
            isHavePlaying = true
            songs_data.map((song_data) =>
                tracks.push({
                    title: song_data.song.name,
                    artist: song_data.song.author,
                    audioSrc: song_data.songName,
                    image: song_data.picture.name,
                    color: "string",
                })
            )

            /!*if (isPlaying) {
                clearInterval(intervalRef.current);
                audioRef.current.pause();
            }
            audioRef.current = new Audio("http://localhost:8100/files/music/" + audioSrc);
            audioRef.current.play();
            setIsPlaying(true);
            startTimer();
            isReady.current = true*!/
            //setIsPlaying(true)

            //isReady.current = true;

        }

    }*/


    const [trackIndex, setTrackIndex] = useState(0);
    const [trackProgress, setTrackProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const {title, artist, color, image, audioSrc} = tracks[trackIndex];
    const audioRef = useRef(new Audio("http://localhost:8100/files/music/" + audioSrc));
    const intervalRef = useRef();
    const isReady = useRef(false);
    const {duration} = audioRef.current;


    const toPrevTrack = () => {
        if (trackIndex - 1 < 0) {
            setTrackIndex(tracks.length - 1);
        } else {
            setTrackIndex(trackIndex - 1);
        }
        setIsPlaying(false)

    }

    const toNextTrack = () => {
        if (trackIndex < tracks.length - 1) {
            setTrackIndex(trackIndex + 1);
        } else {
            setTrackIndex(0);
        }
        setIsPlaying(false)
    }


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
        audioRef.current = new Audio("http://localhost:8100/files/music/" + audioSrc);
        setTrackProgress(audioRef.current.currentTime);
        audioRef.current.play();
        setIsPlaying(true);
        startTimer();

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

    //init()
    return (
        isHavePlaying ? (<div className="audio-player">
            <div className="audio-info">
                <img
                    className="artwork"
                    src={"http://localhost:8100/files/photo/" + image}
                    alt={`track artwork for ${title} by ${artist}`
                    }
                />
                <div>
                    <h5 className="title">{title}</h5>
                    <h5 className="artist">{artist}</h5>
                </div>

            </div>

            <div className="audio-player-control">
                <img onClick={toPrevTrack} className="audio-control-prev" src={prev} width={25} height={25}/>
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
                <img onClick={toNextTrack} className="audio-control-next" src={next} width={25} height={25}/>
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
            </div>

        </div>) : (
            <div>

            </div>
        )


    )

}
export default PlayerItemCOPY