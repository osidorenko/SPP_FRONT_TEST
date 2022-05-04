import {action, computed, observable, runInAction} from "mobx";
import songsStore from "../store/SongsStore"
import postsStore from "../store/PostsStore"

class SearchStore {
    @observable isFind = false;
    @observable users = []
    @observable text = ''
    @observable isMusic = false
    @observable isPosts = false
    @observable isUsers = false

    constructor() {

    }

    chooseSearchPage() {
        this.text = ''
        this.users = []
        this.isFind = false;
        this.isMusic = false
        this.isPosts = false
        this.isUsers = false
    }


    @action
    doSearch(user) {
        this.users = []
        this.isFind = false;
        this.isMusic = false
        this.isPosts = false
        this.isUsers = false
        if (this.text === '') {
            return
        }
        this.getUserByPattern(this.text)
        songsStore.setSearch(user, user, this.text)
        postsStore.setSearch(this.text, user)
        this.isFind = true;
    }


    @action
    setText(event) {
        this.text = event
    }

    getUserByPattern(pattern) {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://localhost:8100/app/users/by/pattern/" + pattern, requestOptions)
            .then(response => response.text())
            .then(result => {
                this.users = JSON.parse(result)
            })
            .catch(error => console.log('error', error));
    }


}

export default new SearchStore()