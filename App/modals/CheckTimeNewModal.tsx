import * as React from "react";
import * as ReactDOM from "react-dom";
import {NotifyResize} from "react-notify-resize";
//import {app} from "../App";
import {observer} from "mobx-react";
import {appState} from "../AppState";
import {httpRequest} from "../utils/httpRequest";
import {
    IGetEncryptKeyReq, IGetEncryptKeyAns, GET_ENCRYPT_KEY_CMD, ILoginReq, ILoginAns, LOGIN_CMD,
    ICheckPoint
} from "../api/api";
import {observable} from "mobx";
import SyntheticEvent = React.SyntheticEvent;
import {Modal, IModalProps} from "./Modal";
import * as QRCodeReact from "qrcode.react";
import {config} from "../config/config";
import {replaceAll} from "../utils/replaceAll";
import moment = require("moment");
import {showToast} from "../utils/showToast";

let QRCode = QRCodeReact as any;


//import  NotifyResize = require("react-notify-resize");

export interface ICheckTimeNewModalProps extends IModalProps {
    checkpoint: ICheckPoint;
}

@observer
export class CheckTimeNewModal extends React.Component<ICheckTimeNewModalProps,any> {
    constructor(props: any, context: any) {
        super(props, context);
        this.props = props;
        this.context = context;

        let time = this.props.checkpoint.checkTime;
        this.timeNum = time.getHours() * 10000 + time.getMinutes() * 100 + time.getSeconds();
    }

    // componentDidMount() {
    //     //$(this.getDOMNode()).modal('show');
    //     //$(this.getDOMNode()).on('hidden.bs.modal', this.props.handleHideModal);
    // };

    @observable timeNum: number;

    getTimeAsStr(timeNum: number): string {
        let str = this.pad(timeNum, 6);
        return str.substr(0, 2) + ":" + str.substr(2, 2) + ":" + str.substr(4, 2);
    }

    pad(num: number, size: number) {
        let s = num + "";
        while (s.length < size)
            s = "0" + s;
        return s;
    }

    checkTimeNative: any;

    render(): any {
        return (
            <Modal>
                <div className="modal-header">
                    <h4 className="modal-title">Укажите время</h4>
                </div>
                <div className="modal-body">
                    <div className="form">
                        <div className="form-group">
                            <div className="input-group">
                                <span className="input-group-addon">
                                    <span className="fa fa-flag-checkered" style={{marginRight:5}}></span>
                                    <span>время</span>
                                </span>
                                <input type="time" step="1"
                                       className="form-control"
                                       required
                                       defaultValue={moment(this.props.checkpoint.checkTime).format("HH:mm:ss")}
                                       ref={(e:any) => {this.checkTimeNative = e; /*$(e).val(this.props.checkpoint.checkTime)*/}}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button
                        type="button"
                        data-dismiss="modal"
                        className="btn btn-success"
                        onClick={()=>{
                            this.props.checkpoint.checkTime=new Date(moment(this.props.checkpoint.checkTime).format("YYYY/MM/DD")+" "+$(this.checkTimeNative).val());
                            this.props.checkpoint.syncOk=false;
                            appState.checkPoints.push(this.props.checkpoint);
                            showToast("записано " + $(this.checkTimeNative).val());
                        }}
                    >
                        Сохранить
                    </button>
                    <button type="button" className="btn btn-default" data-dismiss="modal" onClick={()=>{
                        }}
                    >
                        Отмена
                    </button>
                </div>
            </Modal>
        )
    }

}