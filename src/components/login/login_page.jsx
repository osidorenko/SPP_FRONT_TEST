import React from "react";
import '../../css/login/LoginPage.css'

function LoginPage(props) {
    return(
    <div id="LoginPage" >
        <p id = "NameTag">
            Sign in
        </p>
        {props.children}
    </div>
    );
}
export default LoginPage;