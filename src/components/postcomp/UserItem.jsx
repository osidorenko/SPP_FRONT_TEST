import React from "react";
import ava from '../png/defAvatar.png'

let avatar
const UserItem = ({user}) => {


    //todo png how get
    function getPicture() {


        /*var name = user.picture.name;
        const request = new XMLHttpRequest();
        request.open("GET", "http://localhost:8100//files/photo/" + name, true);
        request.onload = () => {
            if (request.status === 200) {
                let get = new Image("http://localhost:8100//files/photo/"+name);
                avatar = "http://localhost:8100//files/photo/" + name
            } else {
                avatar = ava;
            }
        }
        request.send()*/
    }

    function componentDidMount() {

    }

    //todo href on main profile
    getPicture()
    const nameStyle = {
        top: '50%',
        left: '50%',
        marginTop: '-5px',
        marginLeft: '-5px'
    }
    return (
        <div className="user_comment">
            <ul className="hr">
                <li>
                    <a href="https://vk.com/feed"><img src={"http://localhost:8100//files/photo/" + user.picture.name}
                                                       alt={avatar} width={50} height={50}/></a></li>
            </ul>
            <h3 style={nameStyle}> {user.name}</h3>
        </div>
    );
}
export default UserItem;