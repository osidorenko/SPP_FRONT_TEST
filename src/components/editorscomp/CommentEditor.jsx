import React, {useState} from "react";
import postsStore from "../../store/PostsStore"
import {inject, observer} from "mobx-react";
import defAvater from "../png/defAvatar.png"

const CommentEditor = inject('postsStore', 'user')(observer(({postsStore, user, id}) => {
    const sendMessage = () => {
        const text = postsStore.text;
        if ((text === '')) {
        } else {
            var post_id = id
            var date = new Date()
            const xhr = new XMLHttpRequest();
            const sendData = {
                id: 0,
                post: {
                    id: post_id
                },
                user: {
                    id: user.id,
                    name: user.name,
                    picture: user.picture
                },
                date: null,
                time: null,
                message: text,
                author: "none"
            }

            xhr.open("POST", "http://localhost:8100/comments");
            xhr.setRequestHeader("Content-Type", "application/json")
            xhr.onload = () => {
                if (xhr.status == 200) {
                    console.log("sended message")
                    //props.post.comments.push(sendData)
                    //postsStore.addNewComment(post_id, sendData)
                    //console.log(xhr.responseText);
                } else {
                    //console.log("Server response: ", xhr.statusText);
                }
            };
            console.log(sendData)

            xhr.send(JSON.stringify(sendData));
            sendData.date = date.getFullYear() + "-" + date.getUTCMonth() + "-" + date.getUTCDate();
            sendData.time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
            postsStore.addNewComment(post_id, sendData)
        }
    }

    return (
        <div className="comment_editor">
            <strong>
                <img style={{borderRadius: "120px"}} src={"http://localhost:8100/files/photo/" + user.picture.name}
                     width={40} height={40}/>
            </strong>
            <input
                type="text" size="80"
                value={postsStore.text} onChange={event => postsStore.setText(event.target.value)}/>
            <button onClick={sendMessage}>SEND</button>
        </div>
    );
}))

export default CommentEditor
