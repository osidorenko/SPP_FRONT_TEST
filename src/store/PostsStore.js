import {action, makeAutoObservable, observable} from "mobx";

class PostsStore {
    @observable posts = []
    pCurrent = 0


    constructor() {
        this.getNextPosts()
        makeAutoObservable(this)
    }


    getNextPosts() {
        const request = new XMLHttpRequest();
        request.open("GET", "http://localhost:8100/posts/" + this.pCurrent, true);
        request.onload = () => {
            console.log(request.status + " " + this.pCurrent)
            if (request.status === 200) {
                let post = JSON.parse(request.responseText)
                this.posts.push(post)
                /*let posts1 = this.posts;
                posts1.push(post)
                this.posts = posts1*/
                this.pCurrent = this.pCurrent + 1
            } else {
                if (request.status === 404) {
                    this.pCurrent = this.pCurrent + 1
                    if (this.pCurrent < 10) {
                        this.getNextPosts()
                    }
                }
            }

        }
        //request.setRequestHeader("Content-Type", "application/json; charset=utf-8");
        request.send(null)
    }

    @action addNewComment(post_id, addedcomment) {
        let l = 0;
        let i = 0;
        for (i = 0; i < this.posts.length; i++) {
            if (this.posts[i].id === post_id) {
                l = i
            }
        }
        let temppost = this.posts[l];
        temppost.comments.push(addedcomment)
        this.posts.splice(l, 1, temppost);
        /*this.posts.map((post) => {
                if (post.id === post_id) {
                    post.comments.push(addedcomment)
                }
            }*/

    }


}

export default new PostsStore()