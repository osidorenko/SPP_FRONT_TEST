import {observable} from "mobx";
import userStore from "./UserStore"
import {User} from "../index";

class MainUserStore {

    @observable user = {}/*{
        id: 6,
        name: "KALEO",
        picture: {
            id: 999,
            name: "kaleoava.png"
        }
    }*/

    getUser() {
        return this.user
    }

    setUser(user) {

        this.user = user
        User.name = user.name
        User.id = user.id
        User.picture.id = user.picture.id
        User.picture.name = user.picture.name
        userStore.reBuild(this.user.id, this.user)

    }

    constructor() {
    }
}

export default new MainUserStore()