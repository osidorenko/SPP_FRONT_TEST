import {action, observable} from "mobx";

class PostEditorStore {
    @observable isChose = false
    @observable isChoseMusic = false
    @observable fil
    @observable fileC
    @observable text_post = ''

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

        fetch("http://localhost:8100/upload/photo/", requestOptions)
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
            return
        }
        var raw1 = JSON.stringify(raw)
        console.log(raw1)
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw1,
            redirect: 'follow'
        };

        fetch("http://localhost:8100/posts", requestOptions)
            .then(response => response.text())
            .then(result => {
                this.text_post = ''
                this.isChose = false;
                this.fileC = undefined
                this.fil = undefined
                this.isChoseMusic = false
                console.log("SENDED " + result)
            })
            .catch(error => console.log('error', error));
        this.sendData()
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
}

export default new PostEditorStore();