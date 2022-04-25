import React from 'react';
/*
import {ReactComponent as Play} from './start.png';
import {ReactComponent as Pause} from './pause.png';
import {ReactComponent as Next} from './next.png';
import {ReactComponent as Prev} from './prev.png';
*/
import Play from './start.png';
import Pause from './pause.png';
import Next from './next.png';
import Prev from './prev.png';


const AudioControls = ({
                           isPlaying,
                           onPlayPauseClick,
                           onPrevClick,
                           onNextClick
                       }) => (
    <div className="audio-controls">
        <button
            type="button"
            className="prev"
            aria-label="Previous"
            onClick={onPrevClick}>
            <Prev/>
        </button>
        {isPlaying ? (
            <button
                type="button"
                className="pause"
                onClick={() => onPlayPauseClick(false)}
                aria-label="Pause">
                <Pause/>
            </button>
        ) : (
            <button
                type="button"
                className="play"
                onClick={() => onPlayPauseClick(true)}
                aria-label="Play"
            >
                <Play/>
            </button>
        )}
        <button
            type="button"
            className="next"
            aria-label="Next"
            onClick={onNextClick}
        >
            <Next/>
        </button>
    </div>
);
export default AudioControls