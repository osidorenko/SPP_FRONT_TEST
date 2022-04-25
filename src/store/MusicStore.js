import {makeAutoObservable} from "mobx";

class MusicStore {
    songs = []
    whoPlayed = 0

    constructor() {
        makeAutoObservable(this)
    }

    addMusicToList(song) {
        this.songs.push(song)
    }

    addNewPlayList(songs) {
        this.songs.length = 0
        songs.map(song => {
            this.songs.push(song)
        })
    }


}

export default new MusicStore()