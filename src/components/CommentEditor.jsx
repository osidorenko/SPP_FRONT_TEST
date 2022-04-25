import React, {useState} from "react";

const CommentEditor = ({user, props}) => {

    const [text, setText] = useState('')

    function sendMessage() {
        if (alert(text === '')) {
        } else {
            var post_id = props.post.id
            const xhr = new XMLHttpRequest();

            const sendData = {
                id: 0,
                post: {
                    id: post_id
                },
                user: {
                    id: user.id
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
                    props.post.comments.push(sendData)

                    //console.log(xhr.responseText);
                } else {
                    //console.log("Server response: ", xhr.statusText);
                }
            };
            console.log(sendData)
            xhr.send(JSON.stringify(sendData));
        }
        setText('')
    }

    return (
        <div className="comment_editor">
            <strong>
                <img src={"http://localhost:8100//files/photo/" + user.picture.name}
                     width={40} height={40}/>
            </strong>
            <input
                type="text" size="80"
                value={text} onChange={event => setText(event.target.value)}/>
            <button onClick={sendMessage}>SEND</button>
        </div>
    );
}

export default CommentEditor