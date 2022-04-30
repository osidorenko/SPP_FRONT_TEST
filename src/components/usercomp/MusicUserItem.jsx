import React, {useState} from "react";
import MusicListItem from "./MusicListItem";
import {inject, observer} from "mobx-react";
import songsStore from "../../store/SongsStore"

const MusicUserItem = inject('songsStore', 'user')(observer(({songsStore, user}) => {
        return (
            <div className="music_list_form">
                <MusicListItem songs_data={songsStore.songs}/>
                <button onClick={() => songsStore.nextSongs(5)}>Следующие</button>
            </div>
        )
    }
    )
)
export default MusicUserItem