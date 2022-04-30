import {action, observable} from "mobx";

class MusicEditorStore {

    @observable test_music = ''
    @observable fileMusic
    @observable filePic
    @observable fileR
    @observable fileRmus
    @observable isChose = false
    @observable isChoseMusic = false
    @observable lasting = 0
    errorSend = 0

    constructor() {
    }


    @action
    setText = (value) => {
        this.test_music = value
    }

    sendData() {
        var formdata = new FormData();
        if (this.filePic === undefined) {
            alert("Ошибка отправки")
            return;
        }
        const file = this.filePic

        if (file === undefined) {
            return
        }
        formdata.append("file", file);
        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };
        fetch("http://localhost:8100/upload/photo/", requestOptions)
            .then(response => response.text())
            .then(result => console.log("Send music PIC"))
            .catch(error => console.log());
    }

    sendDataMusic() {
        var formdata = new FormData();
        if (this.fileMusic === undefined) {
            alert("Ошибка отправки")
            return
        }
        const file = this.fileMusic
        formdata.append("file", file);
        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };
        fetch("http://localhost:8100/upload/music/", requestOptions)
            .then(response => response.text())
            .then(result => console.log("Send music MP3"))
            .catch(error => console.log());
    }

    @action
    addNeMusic(user) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify(this.makeMusicTosend(user))
        if (raw === undefined) {
            alert("Ошибка отправки")
            return
        }
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        this.sendDataMusic()
        this.sendData()
        if (this.errorSend !== 0) {
            alert("Ошибка отправки")
            this.errorSend = 0
        }
        fetch("http://localhost:8100/songs/data", requestOptions)
            .then(response => response.text())
            .then(result => console.log("Send music data"))
            .catch(error => this.errorSend++);

        this.test_music = ''
        this.fileMusic = undefined
        this.filePic = undefined
        this.fileR = undefined
        this.fileRmus = undefined
        this.isChose = false
        this.isChoseMusic = false
        this.lasting = 0

    }


    makeMusicTosend(puser) {
        const user_id = puser.id;
        var song_path = this.fileMusic
        var picture_name = this.filePic
        var song_name = this.test_music
        var lasting = this.lasting
        if (song_path === undefined) {
            this.errorSend++
            return
        }
        if (picture_name === undefined) {
            this.errorSend++
            return
        }
        if (lasting === 0) {
            this.errorSend++
            return
        }
        if (song_name === '') {
            this.errorSend++
            return
        }
        song_path = this.fileMusic.name
        picture_name = this.filePic.name
        song_name = this.test_music
        lasting = this.lasting
        var song_data =
            {
                id: 0,
                user: {
                    id: puser.id
                },
                songName: song_path,
                picture: {
                    id: 0,
                    name: picture_name
                },
                song: {
                    id: 0,
                    name: song_name,
                    author: puser.name,
                    lasting: lasting
                }
            }
        return song_data
    }


}

export default new MusicEditorStore();