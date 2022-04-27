import React, {useState} from "react";
import {inject, observer} from "mobx-react";
import pic from "./png/content.png"

const PostsEditor = /*inject('postsStore', 'user')(observer(*/({postsStore, user}) => {

    function fileinfo() {
        const file = document.getElementById('input').files[0]
        let reader = new FileReader();
        reader.readAsArrayBuffer(file)
        reader.onload = function () {
            console.log(reader);
        };
        /*var path = (window.URL || window.webkitURL).createObjectURL(file);
        console.log('path', path);*/
        console.log(file)

        /*
                console.log(file.webkitdirectory)
                console.log(document.getElementById('input').files[0].filePath)*/
    }

    function sendData() {
        var formdata = new FormData();
        const file = document.getElementById('inputPNG').files[0]
        formdata.append("file", file);
        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch("http://localhost:8100/upload/photo/", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    function sendDataMusic() {
        var formdata = new FormData();
        const file = document.getElementById('inputMP3').files[0]
        formdata.append("file", file);
        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch("http://localhost:8100/upload/music/", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }


    return (
        <div className="post_editor_form">
            <h2>Add Post</h2>
            <div>
                <div>
                    <input type="file" id="inputPNG" width={50} height={50} accept=".png"/>
                    <button onClick={sendData}>SEND PHOTO</button>
                </div>
                {/*<div>
                    <input type="file" id="inputMP3" accept=".mp3"/>

                    <button onClick={sendDataMusic}>SEND MUSIC</button>
                </div>*/}

            </div>

        </div>
    )
}
/*)
)*/
export default PostsEditor