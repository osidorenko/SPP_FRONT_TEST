import React from "react";
import pic from "./png/download.png";
import musicEditorStore from "../store/MusicEditorStore";
import play from "./png/play.png";
import pause from "./png/pause1.png";
import def from "./png/content.png";
import {inject, observer} from "mobx-react";


const MusicEditor = inject('musicEditorStore', 'user')(observer(({musicEditorStore, user}) => {

    return (
        <div className="music_editor_form">
            <h2>Добавить новый трек</h2>
            <div>
                <h3>Название трека</h3>
                <input value={musicEditorStore.test_music}
                       onChange={event => musicEditorStore.setText(event.target.value)}
                       type="text" size="30"/>
            </div>
            <div>
                <h3>Выбрать трек</h3>
                <input type="file" id="inputMP3" name="file" className="input input__file" accept=".mp3"/>
                <label htmlFor="inputMP3" className="input__file-button">
                    <span className="input__file-icon-wrapper"><img className="input__file-icon" src={pic}
                                                                    alt="Выбрать файл" width="25"/></span>
                </label>
            </div>
            <div>
                <h3>Выбрать обложку</h3>
                <input type="file" id="inputPNG" name="file" onChange={() => {
                    var reader = new FileReader()
                    reader.onload = () => {
                        console.log(reader.result)
                        musicEditorStore.fileR = reader.result
                    }
                    const file = document.getElementById('inputPNG').files[0]
                    musicEditorStore.filePic = file
                    /*setFileC(file)*/
                    reader.readAsDataURL(file);
                    musicEditorStore.isChose = true
                }}
                       className="input input__file" accept=".png"
                />
                <label htmlFor="inputPNG" className="input__file-button">
                    <span className="input__file-icon-wrapper"><img className="input__file-icon" src={pic}
                                                                    alt="Выбрать файл" width="25"/></span>
                </label>
            </div>
            <button>Добавить трек</button>

            <div className="music_item">
                <div className="music_item__play">
                    <img src={pause} height={20} width={20}/>
                </div>
                <div>
                    {musicEditorStore.isChose ? (
                        <img className="music_item_img"
                             src={musicEditorStore.fileR} height={40}
                             width={40}/>
                    ) : (
                        <img className="music_item_img" src={""} height={40} width={40}/>
                    )}
                </div>

                <div><h3 className="music_item_name">
                    {user.name} - {musicEditorStore.test_music}
                </h3>
                    <h4 className="music_item_lasting">
                        {((musicEditorStore.lasting | 0) / 60) | 0}:{
                        ((musicEditorStore.lasting | 0) % 60) > 9 ? ((musicEditorStore.lasting | 0) % 60) : ("0" + (musicEditorStore.lasting | 0) % 60)
                    }
                    </h4>
                </div>
            </div>
        </div>

    )
}))
export default MusicEditor

