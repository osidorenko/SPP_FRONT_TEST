import React from "react";
import {inject, observer} from "mobx-react";
import musicStore from "../../store/MusicStore";
import MusicUserItem from "../usercomp/MusicUserItem";
import PlayerItem from "./PlayerItem";
import MusicListItem from "../usercomp/MusicListItem";
import HeadItem from "../postcomp/HeadItem";

const NowPlayItem = inject('musicStore')(observer(({musicStore}) => {
    return (
        <div>
            <HeadItem/>
            <div className="music_list_form">
                <h2>Сейчас играет</h2>
                <MusicListItem songs_data={musicStore.songs}/>
            </div>
            <div className="empty"/>
            <PlayerItem/>
        </div>
    )
}))
export default NowPlayItem