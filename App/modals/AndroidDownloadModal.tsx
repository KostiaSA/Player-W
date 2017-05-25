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
import {Modal, IModalProps} from "./Modal";
import * as QRCodeReact from "qrcode.react";
import {config} from "../config/config";

let QRCode = QRCodeReact as any;


//import  NotifyResize = require("react-notify-resize");

export interface IAndroidDownloadModalProps extends IModalProps {

}

export class AndroidDownloadModal extends React.Component<IAndroidDownloadModalProps,any> {

    // componentDidMount() {
    //     //$(this.getDOMNode()).modal('show');
    //     //$(this.getDOMNode()).on('hidden.bs.modal', this.props.handleHideModal);
    // };


  render(): any {
        return (
            <Modal>
                <div className="modal-header">
                    <h4 className="modal-title">Установка .apk на Android</h4>
                </div>
                <div className="modal-body">
                    <p>
                        Отсканируйте этот код с Android-устройства, или вручную откройте в браузере ссылку<br/>
                        <i>{config.apkUrl}</i>
                    </p>
                    <div className="text-center">
                        <QRCode value={config.apkUrl}/>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">Закрыть</button>
                </div>
            </Modal>
        )
    }

}