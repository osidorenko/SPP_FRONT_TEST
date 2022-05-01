import React from "react";
import {inject, observer} from "mobx-react";
import like from "../png/like.png"
import dislike from "../png/dislike.png"

const SocialItem = inject('postsStore', 'user')(observer(({postsStore, user, post}) => {



    return (
        <div className="social_form">
            <div onClick={() => postsStore.clickLike(post.id,user.id)}>
                {postsStore.isLike(post.id) ? (
                    <div className="social_block_choose">
                        <img src={like} height={30} width={30}/>
                        <p className="social_block_p">{postsStore.getLikes(post.id)}</p>
                    </div>
                ) : (
                    <div className="social_block">
                        <img src={like} height={30} width={30}/>
                        <p className="social_block_p">{postsStore.getLikes(post.id)}</p>
                    </div>
                )}
            </div>
            <div onClick={() => {
                postsStore.clickDisLike(post.id,user.id)
            }}>
                {postsStore.isDisLike(post.id) ? (
                    <div className="social_block_choose">
                        <img src={dislike} height={30} width={30}/>
                        <p className="social_block_p">{postsStore.getDisLikes(post.id)}</p>
                    </div>
                ) : (
                    <div className="social_block">
                        <img src={dislike} height={30} width={30}/>
                        <p className="social_block_p">{postsStore.getDisLikes(post.id)}</p>
                    </div>
                )}
            </div>
        </div>)
}))
export default SocialItem