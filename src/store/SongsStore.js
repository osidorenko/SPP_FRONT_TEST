import {action, computed, observable, runInAction} from "mobx";
import userStore from "../store/UserStore";
import {observer} from "mobx-react";

class SongsStore {
    @observable songs = []
    @observable songsBuffer = []
    @observable countView = 0
    mainuser
    user
    @observable hashmap = new Map()
    @observable lovesongs = []


    constructor() {
    }


    setUser(user, mainuser) {
        this.mainuser = mainuser
        this.hashmap = new Map()
        this.user = user
        this.songs = []
        this.songsBuffer = []
        this.countView = 0
        this.getAllUserLike()
        if (mainuser.name === user.name) {
            this.loadLikeMusic()
        }
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
    }

    setSongs(songs) {

        this.songsBuffer = songs
    }

    isLike(song_id) {
        return this.hashmap.get(song_id) === 1
    }

    @action
    addLike(song_id) {
        this.hashmap.delete(song_id)
        this.hashmap.set(song_id, 1)
        //todo
        //this.lovesongs.push()
        this.sendAddLike(song_id, this.mainuser.id)
    }

    @action
    removeLike(song_id) {
        this.hashmap.delete(song_id)
        this.hashmap.set(song_id, 0)
        if (this.lovesongs.length > 0) {
            var newlikes = []
            this.lovesongs.map(song => {
                if (song.id !== song_id) {
                    newlikes.push(song)
                }
            })
            this.lovesongs = []
            this.lovesongs = newlikes
        }
        this.sendRemoveLike(song_id, this.mainuser.id)
    }


    getSongs() {
        return this.songsBuffer
    }

    getSongsAll() {
        var mapa = new Map();
        this.songsBuffer.map(song => {
            mapa.set(song.id,song)
        })
        this.lovesongs.map(song => {
            mapa.set(song.id,song)
        })
        return mapa
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
        fetch("http://localhost:8100/app/songs/data/to/author/" + this.user.id, requestOptions)
            .then(response => response.text())
            .then(result => {
                this.setSongs(JSON.parse(result))
                this.nextSongs(3)
            })
            .catch(error => console.log('error', error));

    }

    loadLikeMusic() {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://localhost:8100/app/songs/data/likes/to/author/" + this.mainuser.id, requestOptions)
            .then(response => response.text())
            .then(result => {
                var temp = JSON.parse(result)
                var i = temp.length - 1;
                var reversetmp = []
                for (i = temp.length - 1; i !== -1; i--) {
                    reversetmp.push(temp[i])
                }
                this.lovesongs = reversetmp
            })
            .catch(error => console.log('error', error));
    }


    sendAddLike(song_id, user_id) {
        var requestOptions = {
            method: 'POST',
            redirect: 'follow'
        };
        fetch("http://localhost:8100/app/likes/song/add/" + song_id + "/" + user_id, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    sendRemoveLike(song_id, user_id) {
        var requestOptions = {
            method: 'POST',
            redirect: 'follow'
        };
        fetch("http://localhost:8100/app/likes/song/del/" + song_id + "/" + user_id, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }


    getAllUserLike() {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        fetch("http://localhost:8100/app/likes/song/to/author/" + this.mainuser.id, requestOptions)
            .then(response => response.text())
            .then(result => {
                var likes = JSON.parse(result)
                likes.map(like => {
                        console.log("like for user" + this.mainuser.id + " songid " + like.songData)
                        this.hashmap.set(like.songData, 1)
                    }
                )
            })
            .catch(error => console.log('error', error));
    }
}

export default new SongsStore()