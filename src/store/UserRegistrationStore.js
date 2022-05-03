import {action, observable} from "mobx";

class UserRegistrationStore {
    @observable email = ''
    @observable name = ''
    @observable nickname = ''
    @observable password = ''
    @observable confirm_password = ''

    constructor() {

    }

    @action
    setEmail = (value) => {
        this.email = value
    }
    @action
    setName = (value) => {
        this.name = value
    }
    @action
    setNickname = (value) => {
        this.nickname = value
    }
    @action
    setPassword = (value) => {
        this.password = value
    }
    @action
    setConfirm = (value) => {
        this.confirm_password = value
    }



}

export default new UserRegistrationStore()