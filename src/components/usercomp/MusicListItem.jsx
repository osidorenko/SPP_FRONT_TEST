import React from "react";
import ClassMusicItem from "./ClassMusicItem";

const MusicListItem = ({songs_data, create}) => {


    return (
        <div>
            {
                songs_data.map((song_data) =>
                    <ClassMusicItem create={create} song_data={song_data} key={song_data.id}/>
                )
            }
        </div>
    )
}
export default MusicListItem