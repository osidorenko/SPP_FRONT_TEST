import React from "react";
import prev from '../player/prev.png'
import next from '../player/next.png'
import start from '../player/start.png'
import pause from '../player/pause.png'

var isPlayed = false
var isInit = false;
var audio
const HeadItem = () => {

    function ajaxGetMusic() {
        if (!isInit) {
            audio = new Audio("http://localhost:8100/files/music/ATL.mp3")
            isInit = true
        }
        if (isPlayed) {
            audio.pause();
            isPlayed = false;
        } else {
            //todo playlist

            audio.play();
            isPlayed = true;
        }
    }

    return (
        <ul className="header_main">
            <div className="logo_main">
                <h1>SocialMusic</h1>
            </div>

        </ul>
    );
    //<li className="player_main">
    //                 <div>
    //                     <div>AUTHOR - SONGNAME</div>
    //                 </div>
    //                 <div>
    //                     <button className="player_button">
    //                         <img src={prev} width="30" height="30"/>
    //                     </button>
    //                     <button onClick={ajaxGetMusic} className="player_button">
    //                         <img src={start} width="30" height="30"/>
    //                     </button>
    //                     <button className="player_button"><img src={next} width="30" height="30"/></button>
    //
    //                 </div>
    //             </li>
}
export default HeadItem;