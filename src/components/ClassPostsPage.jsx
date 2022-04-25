import React from "react";

import PostList from "./postcomp/PostList";

//notused
class ClassPostsPage extends React.Component {

    constructor(props) {
        super(props);

        //makeClassComponentObserver()
        /*this.state = {
            posts: [],
            pCurrent: 0
        }*/
        /*this.ajaxGetComments = this.ajaxGetComments.bind(this);*/
    }

    /*ajaxGetComments() {
        const request = new XMLHttpRequest();
        request.open("GET", "http://localhost:8100/posts/" + this.state.pCurrent, true);
        request.onload = () => {
            if (request.status === 200) {
                let post = JSON.parse(request.responseText)
                let posts1 = this.state.posts;
                posts1.push(post)
                this.setState({posts: posts1})
                //this.setPosts([...posts])
                this.setPCurrent(this.state.pCurrent + 1)
                //console.log(request.responseText);
            } else {
                if (request.status === 404) {
                    this.setPCurrent(this.state.pCurrent + 1)
                    if (this.state.pCurrent < 10) {
                        this.ajaxGetComments()
                    }
                }
            }

        }
        //request.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        request.send(null)
    }*/

    componentDidMount() {
        //this.ajaxGetComments()
    }

    /* setPCurrent(i) {
         this.state.pCurrent = i
     }*/


    render() {
        return (
            <div>
                <PostList posts={{/*postsStore.prototype.posts*/}} title={"1.SHIT POSTS LIST"}/>
                <button onClick={{/*postsStore.prototype.getNextPosts*/}}>doRequest</button>
            </div>
        )
    }
}

export default ClassPostsPage