import React from "react";
import MusicItem from "./MusicItem";


const MusicListItem = ({songs_data}) => {


    return (
        <div>
            {songs_data !== undefined ? (
                songs_data.map((song_data) =>
                    <MusicItem songs_data={songs_data} song_data={song_data} key={song_data.id}/>
                )
            ) : (
                <div/>
            )
            }

        </div>
    )
}
export default MusicListItem