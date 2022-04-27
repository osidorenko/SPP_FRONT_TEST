import {makeAutoObservable} from "mobx";

class CommentsStore {

    constructor() {
        makeAutoObservable(this)
    }

}

export default new CommentsStore()