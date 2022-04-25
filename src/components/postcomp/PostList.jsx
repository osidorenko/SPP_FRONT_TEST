import React from 'react';
import PostItem from "./PostItem";
import ClassPostItem from "./ClassPostItem";
import {observer} from "mobx-react-lite";

const PostList = observer(({posts, title}) => {
    return (
        <div>

            {
                posts.map((post) =>
                    <ClassPostItem post={post} key={post.id}/>
                )}
        </div>
    );
});

export default PostList;