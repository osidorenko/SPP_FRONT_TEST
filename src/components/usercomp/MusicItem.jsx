import React from "react";
import play from "../png/play.png";
import pause from "../png/pause1.png";
import def from "../png/content.png";
import musicStore from "../../store/MusicStore"
import {inject, observer} from "mobx-react";

const MusicItem = inject('musicStore')(observer(({songs_data, song_data}) => {

        return (
            <div className="music_item">
                <div className="music_item__play">
                    {musicStore.isPlaySong(song_data.song.id) ? (
                        <img onClick={event => {
                            //todo event from
                            if (songs_data === undefined) {
                                musicStore.addMusicToList(song_data)
                            }else{
                                musicStore.addNewPlayList(songs_data,song_data.song.id)
                            }

                            /*this.changePlay()*/
                        }} src={play} height={20} width={20}/>
                    ) : (
                        <img onClick={event => {
                            if (songs_data === undefined) {
                                musicStore.addMusicToList(song_data)
                            }else{
                                musicStore.addNewPlayList(songs_data,song_data.song.id)
                            }
                            /*this.changePlay()*/
                        }} src={pause} height={20} width={20}/>
                    )}
                </div>
                <div>
                    {true ? (
                        <img className="music_item_img"
                             src={"http://localhost:8100/files/photo/" + song_data.picture.name} height={40}
                             width={40}/>
                    ) : (
                        <img className="music_item_img" src={def} height={40} width={40}/>
                    )}
                </div>

                <div><h3 className="music_item_name">
                    {song_data.song.author} - {song_data.song.name}
                </h3>
                    <h4 className="music_item_lasting">
                        {((song_data.song.lasting | 0) / 60) | 0}:{
                        ((song_data.song.lasting | 0) % 60) > 9 ? ((song_data.song.lasting | 0) % 60) : ("0" + (song_data.song.lasting | 0) % 60)
                    }
                    </h4>
                </div>

            </div>
        )
    }
    )
)
export default MusicItem