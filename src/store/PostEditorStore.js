import {action, observable} from "mobx";
import songsStore from "../store/SongsStore";

class PostEditorStore {
    @observable isChose = false
    @observable isChoseMusic = false
    @observable fil
    @observable fileC
    @observable text_post = ''
    @observable songsInPost = new Map()
    @observable songsInList = []


    constructor() {
    }

    sendData() {
        var formdata = new FormData();
        const file = this.fileC
        if (file === undefined) {
            return
        }
        this.isChose = true
        formdata.append("file", file);
        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch("http://localhost:8100/app/upload/photo/", requestOptions)
            .then(response => response.text())
            .then(() => {
            })
            .catch(error => console.log('error', error));
    }

    @action
    addNewPost(user) {
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = this.makeObjectTosend(user)
        if (raw === undefined) {
            return false
        }
        var raw1 = JSON.stringify(raw)
        console.log(raw1)
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw1,
            redirect: 'follow'
        };

        fetch("http://localhost:8100/app/posts", requestOptions)
            .then(response => response.text())
            .then(result => {
                this.text_post = ''
                this.isChose = false;
                this.fileC = undefined
                this.fil = undefined
                this.isChoseMusic = false

                var post_id = result
                this.songsInList.map(song => {
                    this.sendSongsToPost(post_id, song.id)
                })
                this.songsInPost = new Map()
                this.songsInList = []
            })
            .catch(error => console.log('error', error));
        this.sendData()
        return true
    }

    @action
    setText = (value) => {
        this.text_post = value
    }

    makeObjectTosend(user) {
        var filename = ''
        var music = ''

        if (this.isChose) {
            const fff = this.fileC
            filename = fff.name
        }
        if (this.isChoseMusic) {
            //todo songs list choose
            //music = tempTrack.song.id
        }
        if (this.text_post === '') {
            return undefined
        }
        var raw = {
            id: 0,
            user: {
                id: user.id
            },
            message: this.text_post,
            picture: {
                id: 0,
                name: filename
            },
            songName: music + "",
            comments: []
        }
        return raw
    }

    sendSongsToPost(post_id, song_id) {
        var myHeaders = new Headers();
        var requestOptions = {
            method: 'POST',
            redirect: 'follow'
        };

        fetch("http://localhost:8100/app/songs/to/post/" + post_id + "/+" + song_id, requestOptions)
            .then(response => response.text())
            .then()
            .catch(error => console.log('error', error));
    }

    removeFromThisPost(song_id) {
        this.songsInPost.set(song_id, 0)
        if (this.isChoseMusic) {
            this.applyMusicList()
        }
    }

    addToThisPost(song_id) {
        this.songsInPost.set(song_id, 1)
        if (this.isChoseMusic) {
            this.applyMusicList()
        }
    }

    isInList(song_id) {
        return this.songsInPost.get(song_id) === 1
    }

    applyMusicList() {
        var songs = songsStore.getSongsAll()
        this.songsInList = []
        const iterator = songs.entries();
        const size = songs.size;
        var i = 0
        while(i<size){
            var song = iterator.next().value[1]
            if (this.songsInPost.get(song.id) === 1) {
                this.songsInList.push(song)
            }
            i++
        }
        /*songs.map(song => {
                if (this.songsInPost.get(song.id) === 1) {
                    this.songsInList.push(song)
                }
            }
        )*/
        if (this.songsInList.length === 0) {
            this.isChoseMusic = false
        } else {
            this.isChoseMusic = true
        }
    }
}

export default new PostEditorStore();