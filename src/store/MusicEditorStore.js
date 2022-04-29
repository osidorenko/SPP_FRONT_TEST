import {action, observable} from "mobx";

class MusicEditorStore {

    @observable test_music = ''
    @observable fileMusic
    @observable filePic
    @observable fileR
    @observable isChose = false
    @observable lasting = 0


    constructor() {
    }


    @action
    setText = (value) => {
        this.test_music = value
    }

    sendDataMusic() {
        var formdata = new FormData();
        const file = this.fileMusic
        formdata.append("file", file);
        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };
        fetch("http://localhost:8100/upload/music/", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    @action
    addNeMusic(user) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify(this.makeMusicTosend(user))
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:8100/posts", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }


    makeMusicTosend(puser) {
        const user_id = puser.id;
        var song_path = ''
        var picture_name = ''
        var song_name = ''
        var lasting = 0
        var song_data =
            {
                id: 0,
                user: {
                    user_id
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