import React from "react";
import {Link} from "react-router-dom";
import {inject, observer} from "mobx-react";
import menu from "../png/menu.png"
import users from "../png/users.png"
import home from "../png/home.png"
import news from "../png/news.png"
import logout from "../png/logout.png"
import search from "../png/search.png"
import searchStore from "../../store/SearchStore"

const HeadItem = inject('searchStore', 'postsStore', 'songsStore', 'userStore', 'user')(observer(({postsStore, songsStore, userStore, user, searchStore}) => {

    return (
        <ul className="header_main">
            <div className="logo_main">
                <h1>SocialMusic</h1>
                <div className="menu_item_head">
                    <img onClick={() => userStore.menuAction()} src={menu} width={35} height={35}/>
                    <div>
                        {userStore.isMenuOpen ? (
                            <div className="menu_item_show">
                                <Link to="user">
                                    <div className="menu_item_show_one" onClick={() => {
                                        userStore.closeMenu()
                                        userStore.reBuild(user.id, user)
                                    }}>
                                        <img src={home} width={35} height={35}/>
                                        <p className="menu_item_show_one_text">домой</p>
                                    </div>
                                </Link>
                                <Link to="users">
                                    <div onClick={() => userStore.closeMenu()} className="menu_item_show_one">
                                        <img src={users} width={35} height={35}/>
                                        <p className="menu_item_show_one_text1">Пользователи</p>
                                    </div>
                                </Link>
                                <Link to="posts">
                                    <div className="menu_item_show_one" onClick={() => {
                                        postsStore.setPosts(user)
                                        userStore.closeMenu()
                                    }}>
                                        <img src={news} width={35} height={35}/>
                                        <p className="menu_item_show_one_text">Посты</p>
                                    </div>
                                </Link>
                                <Link to="search">
                                    <div className="menu_item_show_one" onClick={() => {
                                        searchStore.chooseSearchPage()
                                        userStore.closeMenu()

                                    }}>
                                        <img src={search} width={35} height={35}/>
                                        <p className="menu_item_show_one_text">Поиск</p>
                                    </div>
                                </Link>
                                <Link to="login">
                                    <div className="menu_item_show_one" onClick={() => {
                                        userStore.closeMenu()

                                    }}>
                                        <img src={logout} width={35} height={35}/>
                                        <p className="menu_item_show_one_text">Выход</p>
                                    </div>
                                </Link>
                            </div>
                        ) : (
                            <div/>
                        )}
                    </div>


                </div>

                {/*<Link to="users">
                    <div>
                        <button>Пользователи</button>
                    </div>
                </Link>
                <Link to="user">
                    <div onClick={() => {
                        userStore.reBuild(user.id, user)
                    }}>
                        <button>домой</button>
                    </div>
                </Link>
                <Link to="posts">
                    <div onClick={() => {
                        postsStore.setPosts(user)
                    }}>
                        <button>Посты</button>
                    </div>
                </Link>*/}

            </div>

        </ul>
    );
}))
export default HeadItem;