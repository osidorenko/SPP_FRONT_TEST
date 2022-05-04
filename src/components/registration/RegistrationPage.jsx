import React from "react";
import '../../css/registration/registration_page.css'
import {inject, observer} from "mobx-react";
import userRegistrationStore from "../../store/UserRegistrationStore";
import pic from "../png/download.png";

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
                <p id={"registration_email_label"}> Имя</p>
                <input type={"text"} id={"registration_nickname_input"} value={userRegistrationStore.nickname}
                       onChange={event => {
                           userRegistrationStore.setNickname(event.target.value)
                       }}/>
            </div>
            <div id="registration_email">
                <p id={"registration_email_label"}> Пароль</p>
                <input type={"password"} id={"registration_password_input"} value={userRegistrationStore.password}
                       onChange={event => {
                           userRegistrationStore.setPassword(event.target.value)
                       }}/>
            </div>
            <div id="registration_email">
                <p id={"registration_email_label"}> Подтверждение пароля</p>
                <input type={"password"} id={"registration_confirm_input"}
                       value={userRegistrationStore.confirm_password} onChange={event => {
                    userRegistrationStore.setConfirm(event.target.value)
                }}/>
            </div>
            {userRegistrationStore.isChose ? (
                <div>
                    <h3>Удалить фото</h3>
                    <img onClick={() => userRegistrationStore.isChose = false} width={200} height={200}
                         src={userRegistrationStore.fil}/>
                </div>
            ) : (
                <div className="input__wrapper">
                    <h3>Добавить фото</h3>
                    <input type="file" id="inputPNG" name="file" onChange={() => {
                        var reader = new FileReader()
                        reader.onload = () => {
                            userRegistrationStore.fil = reader.result
                        }
                        const file = document.getElementById('inputPNG').files[0]
                        userRegistrationStore.fileC = file
                        reader.readAsDataURL(file);
                        userRegistrationStore.isChose = true
                    }} className="input input__file" accept=".png"/>
                    <label htmlFor="inputPNG" className="input__file-button">
                    <span className="input__file-icon-wrapper"><img className="input__file-icon" src={pic}
                                                                    alt="Выбрать файл" width="25"/></span>
                    </label>
                </div>
            )
            }
            <div id="registration">
                <input type={"submit"} id={"confirmButton"} value="Create account"/>
            </div>
        </div>
    );
}))

export default RegistrationPage;