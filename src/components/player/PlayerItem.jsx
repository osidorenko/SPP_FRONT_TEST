import React, {useState, useEffect, useRef} from "react";
import start from "./play.png";
import stop from "./stop.png";
import next from "./next.png";
import prev from "./prev.png";
import close from "./closeplayer.png";
import list from "./listplayer.png";

import {render} from "react-dom";
import musicStore from "../../store/MusicStore"
import {inject, observer} from "mobx-react";
import {Link} from "react-router-dom";

let isHavePlaying = true
const PlayerItem = inject('musicStore')(observer(({songs_data}) => {


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
                <Link to="nowplay">
                    <img className="audio-control-menu1" src={list}
                         width={20}
                         height={20}/>
                </Link>
                <img onClick={() => musicStore.closeMethod()} className="audio-control-menu2" src={close}
                     width={20}
                     height={10}/>

            </div>

        </div>) : (
            <div>

            </div>
        )

    )

}))
export default PlayerItem