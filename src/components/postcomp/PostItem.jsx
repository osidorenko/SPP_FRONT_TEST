import React, {useState} from 'react';
import CommentList from "./CommentList";
import UserItem from "./UserItem";
import DataItem from "./DataItem";
import content from '../png/content.png'
import CommentEditor from "../CommentEditor";
import PlayerItem from "../player/PlayerItem";
import PlayerItemPost from "../player/PlayerItemPost";

let comment_count = 2
let isinit = true;
let i = 0
//todo not used!!!!!
const PostItem = (props) => {
    //const i = 0;
    //console.log(props)



    const [state, setState] = useState(0)
    const [comments, setComments] = useState([/*{
        id: -1,
        post: 1,
        user: {
            id: 4,
            name: "ЗАГЛУШКА",
            picture: {
                id: 2,
                name: "picture2.png"
            }
        },
        date: "ЗАГЛУШКА",
        time: "ЗАГЛУШКА",
        message: "ЗАГЛУШКА",
        author: "ЗАГЛУШКА"
    }*/])

    function getNext() {
        comment_count += 10
        init()
    }

    function init() {
        var tmp = []
        let comments1 = comments
        while (i < comment_count) {
            if (i >= props.post.comments.length) {
                break
            }
            let comment = props.post.comments[i]
            if (isinit) {
                //setComments([])
                //comments1 = []
                isinit = false
            }
            comments1.push(comment)
            //com.push(comment)
            i++
        }
        setComments([...comments])
    }

    function componentDidMount() {


    }

    //init()
    return (
        <div className="post">
            <div>
                <div className="post__content">
                    <UserItem user={props.post.user}/>
                    <h3>
                        {props.post.message}
                    </h3>
                    <img src={"http://localhost:8100//files/photo/" + props.post.picture.name}
                         width={500}
                         height={500} alt={content}/>

                    <DataItem date={props.post.date} time={props.post.time}/>
                </div>
                <CommentList comments={comments}/>
                <button className="posts_button" onClick={getNext}>NEXT 10 COMMENTS</button>
                <CommentEditor user={props.post.user} props={props}/>
            </div>
        </div>
    );
};

export default PostItem;