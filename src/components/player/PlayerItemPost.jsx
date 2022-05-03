import React, {useState, useEffect, useRef} from "react";
import start from "./start.png"
import pause from "./pause.png";

//todo delete it never used
const PlayerItemPost = ({song_data, song}) => {
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
    const audioRef = useRef(new Audio("http://localhost:8100/app/files/music/" + song_data.songName));
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
        audioRef.current = new Audio("http://localhost:8100/app/files/music/" + song_data.songName);
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
        audioRef.current = new Audio("http://localhost:8100/app/files/music/" + song_data.songName);
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

    const nameStyle = {
        top: '50%',
        left: '50%',
        marginTop: '0px',
        marginLeft: '0px'
    }
    const nameStyle2 = {
        top: '50%',
        left: '50%',
        marginTop: '+10px',
        marginLeft: '0px'
    }
    return (
        <div className="audio-player">
            {isPlaying?(
                <img src={pause} style={nameStyle}
                     onClick={event => {
                         setIsPlaying(!isPlaying)
                     }}>
                </img>
            ):(
                <img src={start} style={nameStyle}
                     onClick={event => {
                         setIsPlaying(!isPlaying)
                     }}>
                </img>
            )}


            <div className="track-info">
                <h3 className="artist">{song.author} - {song.name} </h3>
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
        </div>

    )

}
export default PlayerItemPost