import React from "react";
import MusicItemChoose from "./MusicItemChoose";

const MusicListChoose = ({songs_data}) => {
    return (
        <div>
            {songs_data.map(song_data =>
                <MusicItemChoose song_data={song_data} key={song_data.id}/>
            )
            }
        </div>
    )

}
export default MusicListChoose