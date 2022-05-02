import React, {useState} from "react";
import MusicListItem from "./MusicListItem";
import {inject, observer} from "mobx-react";
import songsStore from "../../store/SongsStore"

const MusicUserItem = inject('songsStore', 'user')(observer(({songsStore, user, title, isLove}) => {
        return (
            <div className="music_list_form">
                <h2>{title}</h2>
                {isLove ? (
                    <div>
                        {songsStore.lovesongs.length === 0 ? (
                            <h4>У меня нет любимых треков(((</h4>
                        ) : (
                            <MusicListItem songs_data={songsStore.lovesongs}/>
                        )}

                    </div>
                ) : (
                    <div>
                        {songsStore.songsBuffer.length === 0 ? (
                            <h4>У {songsStore.user === undefined ? "" : songsStore.user.name} нет собственных треков</h4>
                        ) : (<div>
                                <MusicListItem songs_data={songsStore.songs}/>
                                {songsStore.songsBuffer.length === songsStore.songs.length ? (
                                    <div></div>
                                ) : (
                                    <button onClick={() => songsStore.nextSongs(5)}>Следующие</button>
                                )}

                            </div>
                        )}
                    </div>
                )}

            </div>
        )
    }
    )
)
export default MusicUserItem