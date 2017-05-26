import * as React from "react";
import * as ReactDOM from "react-dom";
import {observer} from "mobx-react";
import {appState} from "../AppState";
import {httpRequest} from "../utils/httpRequest";
import {observable} from "mobx";
import SyntheticEvent = React.SyntheticEvent;
import CSSProperties = React.CSSProperties;
import moment = require("moment");
import {getDeviceTimeZoneOffsetStr} from "../utils/getDeviceTimeZoneOffsetStr";
import {getGpsTimeZoneOffsetStr} from "../utils/getGpsTimeZoneOffsetStr";
import {IRallyPunkt} from "../api/api";
import {showToast} from "../utils/showToast";


//import  NotifyResize = require("react-notify-resize");

export interface IPlaylistSetupPageProps {

}

@observer
export class PlaylistSetupPage extends React.Component<IPlaylistSetupPageProps, any> {
    constructor(props: any, context: any) {
        super(props, context);
        this.props = props;
        this.context = context;
    }

    componentDidMount() {

    };

    isValidUrl(s: any) {
        let regexp = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
        return regexp.test(s);
    }


    @observable httpRequestRunning: boolean;
    @observable saveError: string = "";

    handleButtonClick = () => {

        let timeIndex = setTimeout(() => {
            this.httpRequestRunning = true;
        }, 500);

        appState.setPlaylist(appState.edemPlaylist)
            .then(() => {
                clearTimeout(timeIndex);
                this.saveError = "";
                this.httpRequestRunning = false;
                appState.edemPlaylistChanged = false;
                showToast("Плейлист успешно сохранен");
            })
            .catch((e) => {
                clearTimeout(timeIndex);
                this.httpRequestRunning = false;
                this.saveError = e.toString();
            })

        // httpRequest<IGetEncryptKeyReq,IGetEncryptKeyAns>({cmd: GET_ENCRYPT_KEY_CMD})
        //     .then((ans: IGetEncryptKeyAns) => {
        //
        //         appState.encryptKey = ans.encryptKey;
        //
        //         let loginReq: ILoginReq = {
        //             cmd: LOGIN_CMD,
        //             login: appState.login,
        //             password: appState.password
        //         };
        //
        //         httpRequest<ILoginReq,ILoginAns>(loginReq)
        //             .then((ans: any) => {
        //                 this.httpRequestRunning = false;
        //                 clearTimeout(timeIndex);
        //
        //                 // очистка хранилища
        //                 appState.clearState();
        //                 window.localStorage.clear();
        //
        //
        //                 window.localStorage.setItem("login", appState.login);
        //                 window.localStorage.setItem("password", appState.password);
        //                 appState.user = ans.user;
        //                 window.localStorage.setItem("user", appState.user!);
        //                 appState.loadTablesFromLocalStore();
        //                 appState.loadTablesFromServer();
        //                 appState.activePage = appState.cardPage;
        //                 appState.startSyncronization();
        //             })
        //             .catch((err: any) => {
        //                 this.httpRequestRunning = false;
        //                 clearTimeout(timeIndex);
        //                 alert(err);
        //             });
        //
        //     })
        //     .catch((err: any) => {
        //         this.httpRequestRunning = false;
        //         clearTimeout(timeIndex);
        //         alert(err);
        //     });
    };

    render(): any {
        //console.log("render Card page");

        let errorMessage = "";
        if (appState.edemPlaylistChanged) {
            if (appState.edemPlaylist.length > 0 && !this.isValidUrl(appState.edemPlaylist)) {
                errorMessage = "неверный формат ссылки";
            }
        }

        return (
            <div className="container" style={{marginLeft: 20}}>
                <div className="row" style={{marginTop: 20}}>
                    <div className="col-md-11">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4 className="text-center">
                                    <i className={"fa fa-cog"} style={{fontSize: 18, marginRight: 10}}></i>
                                    настройка плейлиста
                                </h4>
                            </div>
                            <div className="panel-body">
                                <form className="form-horizontal">
                                    <div className="form-group">
                                        <label className="col-sm-3 control-label">Прямая ссылка на плейлист</label>
                                        <div className="col-sm-9">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={appState.edemPlaylist}
                                                disabled={this.httpRequestRunning}
                                                onChange={(e: any) => {
                                                    appState.edemPlaylist = e.target.value;
                                                    appState.edemPlaylistChanged = true;
                                                    this.saveError = "";
                                                }}
                                                placeholder="пример: https://edem.tv/playlists/uplist/73112aa0039a45645609539a51a/edem_pl.m3u8"/>
                                            <div style={{fontSize: 13, color: "red"}}>{errorMessage}</div>
                                            <div style={{fontSize: 13}}>зайдите в свой личный кабинет на сайте
                                                "edem.tv", откройте раздел "плейлист", найдите ссылку (выделена желтым
                                                на скриншоте) и скопируйте ее сюда
                                            </div>
                                            <img src="img/edem-playlist-screen.PNG" alt=""/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-sm-offset-3 col-sm-10">
                                            <p style={{color: "red"}}>{this.saveError}</p>
                                            <div
                                                className="btn btn-primary"
                                                disabled={this.httpRequestRunning || !(appState.edemPlaylistChanged && this.isValidUrl(appState.edemPlaylist))}
                                                onClick={() => {
                                                    if (appState.edemPlaylistChanged && this.isValidUrl(appState.edemPlaylist)) {
                                                        this.handleButtonClick();
                                                    }
                                                }}
                                            >
                                                Сохранить плейлист
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}