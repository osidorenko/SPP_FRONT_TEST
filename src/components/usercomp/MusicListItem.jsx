import React from "react";
import ClassMusicItem from "./ClassMusicItem";
import MusicItem from "./MusicItem";

const MusicListItem = ({songs_data, create}) => {


    return (
        <div>
            {
                songs_data.map((song_data) =>
                    <MusicItem songs_data={songs_data} song_data={song_data} key={song_data.id}/>
                )
            }
        </div>
    )
}
export default MusicListItem