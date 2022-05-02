import React from "react";
import PostsPage from "./PostsPage";
import HeadItem from "./postcomp/HeadItem";
import PlayerItem from "./player/PlayerItem";

const NewsPage = () => {
    return (
        <div>
            <HeadItem/>
            <PostsPage/>
            <div className="empty"/>
            <PlayerItem/>
        </div>);
}
export default NewsPage
