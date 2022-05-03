import {action, observable} from "mobx";


class UserLoginStore {
    @observable login_field
    @observable password_field

    constructor() {
    }

    @action
    setLogin(event) {
        this.login_field = event
    }

    @action
    setPass(event) {
        this.password_field = event
    }


}

export default new UserLoginStore()