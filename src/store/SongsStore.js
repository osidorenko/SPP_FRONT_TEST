import {action, computed, observable, runInAction} from "mobx";
import userStore from "../store/UserStore";
import {observer} from "mobx-react";

class SongsStore {
    @observable songs = []
    @observable songsBuffer = []
    @observable countView = 0
    user

    constructor() {
    }

    setUser(user) {
        this.user = user
        this.songs = []
        this.songsBuffer = []
        this.countView = 0
        this.loadAll()
    }

    @action
    nextSongs(count) {
        var tempView = this.countView + count;
        this.countView = this.countView + count;
        var i = 0;
        var list = []
        for (i = 0; i < tempView && i < this.songsBuffer.length; i++) {
            list.push(this.songsBuffer[i])
        }

        runInAction(() =>
            this.songs = list
        )
        //list.map(song => this.songs.push(song))

    }

    @action
    loadAll() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch("http://localhost:8100/songs/data/to/author/" + this.user.id, requestOptions)
            .then(response => response.text())
            .then(result => {
                this.setSongs(JSON.parse(result))
                this.nextSongs(3)
            })
            .catch(error => console.log('error', error));

    }

    setSongs(songs) {
        this.songsBuffer = songs
    }


}

export default new SongsStore()