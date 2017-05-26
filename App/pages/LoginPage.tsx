import * as React from "react";
import * as ReactDOM from "react-dom";
import {NotifyResize} from "react-notify-resize";
//import {app} from "../App";
import {observer} from "mobx-react";
import {appState} from "../AppState";
import {httpRequest} from "../utils/httpRequest";
import {IGetEncryptKeyReq, IGetEncryptKeyAns, GET_ENCRYPT_KEY_CMD, ILoginReq, ILoginAns, LOGIN_CMD} from "../api/api";
import {observable} from "mobx";
import SyntheticEvent = React.SyntheticEvent;
import {showModal} from "../modals/showModal";
import {AndroidDownloadModal} from "../modals/AndroidDownloadModal";
import {config} from "../config/config";
import {showErrorToast} from "../utils/showToast";


//import  NotifyResize = require("react-notify-resize");

export interface ILoginPageProps {

}

@observer
export class LoginPage extends React.Component<ILoginPageProps, any> {
    constructor(props: any, context: any) {
        super(props, context);
        this.props = props;
        this.context = context;
    }

    componentDidMount() {
    };


    @observable loginError: string;
    @observable httpRequestRunning: boolean;

    handleButtonClick = () => {

        let timeIndex = setTimeout(() => {
            this.httpRequestRunning = true;
        }, 500);

        httpRequest<IGetEncryptKeyReq, IGetEncryptKeyAns>({cmd: GET_ENCRYPT_KEY_CMD})
            .then((ans: IGetEncryptKeyAns) => {

                appState.encryptKey = ans.encryptKey;

                let loginReq: ILoginReq = {
                    cmd: LOGIN_CMD,
                    login: appState.login,
                    password: appState.password
                };

                httpRequest<ILoginReq, ILoginAns>(loginReq)
                    .then((ans: any) => {
                        this.httpRequestRunning = false;
                        clearTimeout(timeIndex);

                        // очистка хранилища
                        appState.clearState();
                        window.localStorage.clear();


                        window.localStorage.setItem("login", appState.login);
                        window.localStorage.setItem("password", appState.password);
                        appState.user = ans.user;
                        window.localStorage.setItem("user", appState.user!);

                        appState.loadUserInfoFromServer();

                        appState.activePage = appState.playlistSetupPage;
                    })
                    .catch((err: any) => {
                        this.httpRequestRunning = false;
                        clearTimeout(timeIndex);
                        this.loginError = err.toString();
                    });

            })
            .catch((err: any) => {
                this.httpRequestRunning = false;
                clearTimeout(timeIndex);
                this.loginError = err.toString();
            });
    };

    handleTest1Click = () => {


    };

    handleAndroidClick = () => {
        window.location.href = config.apkUrl;
    };

    render(): any {

        let logoSize = 270;
        if (appState.winHeight < 600) {
            logoSize = 130;
            console.log("logosize ", logoSize);
        }


        let butContent: any = "Авторизация";
        if (this.httpRequestRunning)
            butContent = <span>Авторизация <i className="fa fa-circle-o-notch fa-spin fa-fw"></i></span>;

        let androidButton: any = (
            <button className="btn btn-default pull-right" onClick={this.handleAndroidClick}
                    disabled={this.httpRequestRunning}>
                <span className="fa fa-android" style={{color: "#a4ca39", fontSize: 18}}/>
                <span style={{marginLeft: 5}}>скачать .apk</span>
            </button>
        );


        return (
            <div className="container">
                <div className="row">
                    {/*<NotifyResize onResize={this.onResize}/>*/}
                    <div className="col-sm-6 col-sm-offset-3">
                        <h2 className=""><img src="img/buhta-logo.png" style={{height:45, display:"inline"}}/><span style={{marginLeft:10}}>{config.appName}</span></h2>
                        <p><strong>Buhta Player</strong> - это приложение для медиаплеера <strong>Xiaomi Mi Box 3</strong>. Оно позволяет просматривать
                            тв-передачи, транслируемые IPTV-сервисом ЭДЭМ (<strong>edem.tv</strong>)</p>
                        <p>Данный сайт (player.buhta.ru) используется для настройки <strong> уже установленного на медиаплеер Xiaomi</strong> приложения Buhta Player.</p>
                        <p>Порядок установки:</p>
                        <p>1. Зарегистрируйтесь на сайте edem.tv, оплатите подписку и получите доступ в личный кабинет.</p>
                        <p>2. Скачайте с этого сайта приложение для медиаплеера BuhtaPlayer.apk (кнопка "скачать .apk" внизу страницы)</p>
                        <p>3. Установите на медиаплеер приложение BuhtaPlayer.apk и запустите его.</p>
                        <p>4. BuhtaPlayer на первом экране покажет логин и пароль для входа на этот сайт.</p>
                        <p>5. Войдите на сайт в раздел "Плейлист" и выполните настройки.</p>
                        <p></p>
                        <div className="form">
                            <div className="form-group">
                                <div className="input-group">
                                    <span className="input-group-addon" style={{paddingLeft: 20}}>логин</span>
                                    <input type="text"
                                           className="form-control"
                                           placeholder="Логин"
                                           required
                                           value={appState.login}
                                           onChange={(e: any) => {
                                               appState.login = e.target.value;
                                               this.loginError = ""
                                           }}
                                           disabled={this.httpRequestRunning}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="input-group">
                                    <span className="input-group-addon">пароль</span>
                                    <input type="password"
                                           className="form-control"
                                           placeholder="Пароль"
                                           required
                                           disabled={this.httpRequestRunning}
                                           value={appState.password}
                                           onChange={(e: any) => {
                                               appState.password = e.target.value;
                                               this.loginError = ""
                                           }}

                                    />
                                </div>
                            </div>
                            <p style={{color: "red"}}>{this.loginError}</p>
                            <button className="btn btn-primary" onClick={this.handleButtonClick}
                                    disabled={this.httpRequestRunning}>
                                {butContent}
                            </button>
                            {androidButton}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}