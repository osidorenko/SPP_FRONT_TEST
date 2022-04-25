import React from "react";
import start from "./start.png";


//todo not used delete
class ClassPlayerItemClass extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isPlay: false,
            audio: null,
            isInit: false

        }
        this.ajaxGetMusic = this.ajaxGetMusic.bind(this)
    }

    ajaxGetMusic() {
        if (!this.state.isInit) {
            this.state.audio = new Audio("http://localhost:8100/files/music/ATL.mp3")
            this.state.isInit = true
        }
        if (this.state.isPlayed) {
            this.state.audio.pause();
            this.state.isPlayed = false;
        } else {
            //todo playlist
            this.state.audio.play();
            this.state.isPlayed = true;
        }
    }


    render() {
        return (
            <div>
                <div>
                    <button onClick={this.ajaxGetMusic} className="player_button">
                        <img src={start} width="30" height="30"/>
                    </button>
                    <h4>AUTHOR - SONGNAME</h4>
                </div>
                <div>

                </div>
            </div>
        );
    }
}

export default ClassPlayerItemClass