import React from "react";
import {inject, observer} from "mobx-react";
import MusicListChoose from "./MusicListChoose";
import postEditorStore from "../../store/PostEditorStore"
import songsStore from "../../store/SongsStore"
import {Link} from "react-router-dom";

const SongChoose = inject('postEditorStore', 'songsStore')(observer(({postEditorStore, songsStore}) => {
    return (
        <div className="song_choose_form">
            <div>
                <h2>Выбор треков</h2>
            </div>
            <div>
                {songsStore.songsBuffer.length === songsStore.songs.length ? (
                    <div>

                    </div>
                ) : (
                    <div>
                        <h3>Ваши треки</h3>
                        <MusicListChoose songs_data={songsStore.songs}/>
                        <button onClick={() => songsStore.nextSongs(5)}>следующие</button>
                    </div>
                )
                }
                <h3>Любимые треки</h3>
                {songsStore.lovesongs.length === 0 ? (
                    <h4>У вас нет любимых треков</h4>
                ) : (
                    <MusicListChoose songs_data={songsStore.lovesongs}/>
                )}
            </div>
            <Link to="user">
                <button onClick={() => {
                    postEditorStore.isChoseMusic = true
                    postEditorStore.applyMusicList()
                }}>Принять
                </button>
            </Link>
        </div>
    )
}))
export default SongChoose