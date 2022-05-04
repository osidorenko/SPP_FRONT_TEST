import {action, observable} from "mobx";
import {User} from "../index"
import {useNavigate} from "react-router-dom";
import mainUserStore from "../store/MainUserStore"

class UserLoginStore {
    @observable login_field
    @observable password_field
    @observable user

    getUser() {
        return this.user
    }

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

    @action
    LoginIn() {
        this.getUsers(this.login_field, this.password_field)
    }


    getUsers(login, pass) {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        fetch("http://localhost:8100/app/users", requestOptions)
            .then(response => response.text())
            .then(result => {

                var users = JSON.parse(result)
                users.map(
                    user => {
                        if (user.name === login) {
                            console.log("login")

                            mainUserStore.setUser(user)
                        }
                    }
                )

            })
            .catch(error => console.log('error', error));
    }


}

export default new UserLoginStore()