import React from "react";
import play from "../png/play.png";
import pause from "../png/pause1.png";
import def from "../png/content.png";
import musicStore from "../../store/MusicStore"
import {observer} from "mobx-react-lite";

const MusicItem = observer(({song_data}) => {

    return (
        <div className="music_item">
            <div className="music_item__play">
                {this.state.isPlay ? (
                    <img onClick={event => {
                        this.changePlay()
                    }} src={play} height={20} width={20}/>
                ) : (
                    <img onClick={event => {
                        this.changePlay()
                    }} src={pause} height={20} width={20}/>
                )}
            </div>
            <div>
                {this.state.isPhoto ? (
                    <img className="music_item_img"
                         src={"http://localhost:8100//files/photo/" + this.props.song_data.picture.name} height={40}
                         width={40}/>
                ) : (
                    <img className="music_item_img" src={def} height={40} width={40}/>
                )}
            </div>

            <div><h3 className="music_item_name">
                {this.props.song_data.song.author} - {this.props.song_data.song.name}
            </h3>
                <h4 className="music_item_lasting">
                    {((this.props.song_data.song.lasting | 0) / 60) | 0}:{
                    ((this.props.song_data.song.lasting | 0) % 60) > 9 ? ((this.props.song_data.song.lasting | 0) % 60) : ("0" + (this.props.song_data.song.lasting | 0) % 60)
                }
                </h4>
            </div>
        </div>
    )


})
export default MusicItem