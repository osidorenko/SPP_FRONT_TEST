import React from "react";
import '../../css/login/LoginPage.css'

import LoginPage from "./login_page";
import {Link} from "react-router-dom";
import userLoginStore from "../../store/UserLoginStore"
import {inject, observer} from "mobx-react";

const Login_Page_Box = inject('mainUserStore', 'userLoginStore', 'userStore', 'user')(observer(({userLoginStore, user, userStore, mainUserStore}) => {

    return (
        <LoginPage>
            <div id="email">
                <input type={"text"} id="email_field"
                       value={userLoginStore.login_field}
                       onChange={event => {
                           userLoginStore.setLogin(event.target.value)
                       }}/>
            </div>
            <div id="password">
                <input type={"password"} id="password_field"
                       value={userLoginStore.password_field}
                       onChange={event => {
                           userLoginStore.setPass(event.target.value)
                       }}/>
            </div>
            <Link to="user">
                <div id={"signIn"}>
                    <input type={"button"} id="sign_in_button" value={"LOGIN"} onClick={
                        () => {
                            userLoginStore.LoginIn()
                        }
                    }/>
                </div>
            </Link>

            <div>
                <Link to="registration">
                    <div id={"template"}>
                        <p>Not registered? </p>
                        <a id={'register'}> Create an account. </a>
                    </div>
                </Link>
            </div>
        </LoginPage>
    );
}))

export default Login_Page_Box;