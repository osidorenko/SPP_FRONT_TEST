import React, {useState} from "react";
import {inject, observer} from "mobx-react";
import pic from "../png/download.png"
import MusicItem from "../usercomp/MusicItem";
import postEditorStore from "../../store/PostEditorStore"


const PostsEditor = inject('postEditorStore', 'user')(observer(({postEditorStore, user}) => {

        return (
            <div className="post_editor_form">
                <h2>Добавить новый пост</h2>

                <div>
                    <h3>Сообщение поста</h3>
                    <textarea value={postEditorStore.text_post}
                              onChange={event => postEditorStore.setText(event.target.value)}
                              maxLength={256} cols={50}
                              rows={4}></textarea>
                </div>
                {postEditorStore.isChoseMusic ? (
                    <div onClick={() => postEditorStore.isChoseMusic = false}>
                        <h3>Здесь выбраны треки???</h3>
                        {/*<MusicItem song_data={tempTrack}/>*/}
                    </div>
                ) : (
                    <div>
                        <h3>Добавить трек</h3>
                        <button onClick={() => {
                            postEditorStore.isChoseMusic = true
                        }}>ВЫБРАТЬ
                        </button>
                    </div>

                )}

                {postEditorStore.isChose ? (
                    <div>
                        <h3>Удалить фото</h3>
                        <img onClick={() => postEditorStore.isChose = false} width={200} height={200}
                             src={postEditorStore.fil}/>
                    </div>
                ) : (
                    <div className="input__wrapper">
                        <h3>Добавить фото</h3>
                        <input type="file" id="inputPNG" name="file" onChange={() => {
                            var reader = new FileReader()
                            reader.onload = () => {

                                postEditorStore.fil = reader.result
                            }
                            const file = document.getElementById('inputPNG').files[0]
                            postEditorStore.fileC = file
                            reader.readAsDataURL(file);
                            postEditorStore.isChose = true
                        }} className="input input__file" accept=".png"/>
                        <label htmlFor="inputPNG" className="input__file-button">
                    <span className="input__file-icon-wrapper"><img className="input__file-icon" src={pic}
                                                                    alt="Выбрать файл" width="25"/></span>
                        </label>
                    </div>
                )
                }
                <button onClick={() => postEditorStore.addNewPost(user)}>СОЗДАТЬ ПОСТ</button>
            </div>
        )
    }
    )
)
export default PostsEditor