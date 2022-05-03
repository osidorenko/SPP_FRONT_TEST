import React from "react";
import '../../css/registration/registration_page.css'
import {inject, observer} from "mobx-react";
import userRegistrationStore from "../../store/UserRegistrationStore";

const RegistrationPage = inject('userRegistrationStore', 'user')(observer(({userRegistrationStore, user}) => {
    return (
        <div id={"registrationPage"}>
            <p id="RegistrationTag">
                Registration
            </p>
            <div id="registration_email">
                <p id={"registration_email_label"}> Email</p>
                <input type={"text"} id={"registration_email_input"} value={userRegistrationStore.email}
                       onChange={event => {
                           userRegistrationStore.setEmail(event.target.value)
                       }}/>
            </div>
            <div id="registration_email">
                <p id={"registration_email_label"}> Name</p>
                <input type={"text"} id={"registration_name_input"} value={userRegistrationStore.name}
                       onChange={event => {
                           userRegistrationStore.setName(event.target.value)
                       }}/>
            </div>
            <div id="registration_email">
                <p id={"registration_email_label"}> Nickname</p>
                <input type={"text"} id={"registration_nickname_input"} value={userRegistrationStore.nickname}
                       onChange={event => {
                           userRegistrationStore.setNickname(event.target.value)
                       }}/>
            </div>
            <div id="registration_email">
                <p id={"registration_email_label"}> Password</p>
                <input type={"password"} id={"registration_password_input"} value={userRegistrationStore.password}
                       onChange={event => {
                           userRegistrationStore.setPassword(event.target.value)
                       }}/>
            </div>
            <div id="registration_email">
                <p id={"registration_email_label"}> Confirm</p>
                <input type={"password"} id={"registration_confirm_input"}
                       value={userRegistrationStore.confirm_password} onChange={event => {
                    userRegistrationStore.setConfirm(event.target.value)
                }}/>
            </div>

            <div id="registration">
                <input type={"submit"} id={"confirmButton"} value="Create account"/>
            </div>
        </div>
    );
}))

export default RegistrationPage;