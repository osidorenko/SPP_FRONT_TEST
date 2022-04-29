import React from 'react';
import ClassPostItem from "./ClassPostItem";
import {inject, observer} from "mobx-react";

const PostList = inject('postsStore')(observer(({postsStore, title}) => {
    return (
        <div>
            {
                postsStore.posts.map((post) =>
                    <ClassPostItem post={post} key={post.id}/>
                )}
        </div>
    );
}));

export default PostList;