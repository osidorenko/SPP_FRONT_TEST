import React from "react";
import {inject, observer} from "mobx-react";
import musicStore from "../../store/MusicStore";
import add from "../png/addToList.png";
import remove from "../png/removeFromList.png";
import postEditorStore from "../../store/PostEditorStore"

const MusicItemChoose = inject('postEditorStore')(observer(({song_data}) => {
    return (
        <div className="music_item" onClick={() => postEditorStore}>
            <div className="music_item__play">
                {postEditorStore.isInList(song_data.id) ? (
                    <img onClick={() => postEditorStore.removeFromThisPost(song_data.id)} src={remove} height={20}
                         width={20}/>
                ) : (
                    <img onClick={() => postEditorStore.addToThisPost(song_data.id)} src={add} height={20} width={20}/>
                )}
            </div>
            <div>
                <img className="music_item_img"
                     src={"http://localhost:8100/files/photo/" + song_data.picture.name} height={40}
                     width={40}/>
            </div>
            <div>
                <h3 className="music_item_name">
                    {song_data.song.author} - {song_data.song.name}</h3>

                <h4 className="music_item_lasting">
                    {((song_data.song.lasting | 0) / 60) | 0}:{
                    ((song_data.song.lasting | 0) % 60) > 9 ? ((song_data.song.lasting | 0) % 60) : ("0" + (song_data.song.lasting | 0) % 60)
                }
                </h4>
            </div>
        </div>
    )
}))
export default MusicItemChoose