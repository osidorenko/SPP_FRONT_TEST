import React from "react";
import CommetnItem from "./CommentItem";
import {observer} from "mobx-react";
import postsStore from "../../store/PostsStore"

const CommentList = ({comments}) => {
    return (
        <div>
            {/*{
                comments.sort(function (a, b) {
                        if (a.date > b.date) {
                            return 1
                        }
                        if (a.date < b.date) {
                            return -1
                        }
                        if (a.time > b.time) {
                            return 1
                        }
                        if (a.time < b.time) {
                            return -1;
                        }
                        return 0
                    }
                )}*/}
            {
                comments.map((comment) =>
                    <CommetnItem comment={comment} key={comment.id}/>
                )
            }
        </div>
    );
}
export default CommentList;