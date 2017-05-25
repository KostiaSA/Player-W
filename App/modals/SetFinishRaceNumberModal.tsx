import * as React from "react";
import * as ReactDOM from "react-dom";
import {NotifyResize} from "react-notify-resize";
//import {app} from "../App";
import {observer} from "mobx-react";
import {appState} from "../AppState";
import {httpRequest} from "../utils/httpRequest";
import {
    IGetEncryptKeyReq, IGetEncryptKeyAns, GET_ENCRYPT_KEY_CMD, ILoginReq, ILoginAns, LOGIN_CMD,
    ICheckPoint, ILegRegistration
} from "../api/api";
import {observable} from "mobx";
import SyntheticEvent = React.SyntheticEvent;
import {Modal, IModalProps} from "./Modal";
import * as QRCodeReact from "qrcode.react";
import {config} from "../config/config";
import {replaceAll} from "../utils/replaceAll";
import moment = require("moment");
import {showToast} from "../utils/showToast";
import CSSProperties = React.CSSProperties;

let QRCode = QRCodeReact as any;


//import  NotifyResize = require("react-notify-resize");

export interface ISetFinishRaceNumberModalProps extends IModalProps {
    finishTime: Date;
}

@observer
export class SetFinishRaceNumberModal extends React.Component<ISetFinishRaceNumberModalProps,any> {
    constructor(props: any, context: any) {
        super(props, context);
        this.props = props;
        this.context = context;

        //let time = this.props.checkpoint.checkTime;
        //  this.timeNum = time.getHours() * 10000 + time.getMinutes() * 100 + time.getSeconds();
    }

    @observable raceNumber: string = "";
    @observable legRegistration: ILegRegistration = appState.getLegRegistrationByRaceNumber(this.raceNumber);
    //@observable pilot: IPilot = appState.getPilot(this.legRegistration.pilotId);
    @observable checkpoint: ICheckPoint | undefined;

    // componentDidMount() {
    //     //$(this.getDOMNode()).modal('show');
    //     //$(this.getDOMNode()).on('hidden.bs.modal', this.props.handleHideModal);
    // };

    //  @observable timeNum: number;

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

    handleNumButtonClick = (num: string) => {
        if (num === "C")
            this.raceNumber = "";
        else if (num === "<") {
            if (this.raceNumber.length > 0)
                this.raceNumber = this.raceNumber.substr(0, this.raceNumber.length - 1);
        }
        else {
            this.raceNumber += num;
        }

        this.legRegistration = appState.getLegRegistrationByRaceNumber(this.raceNumber);

        if (appState.getIsCycleRally()) {
            let nextPunkt = appState.getNextCycleRallyPunkByLegRegsId(this.legRegistration.id);
        }
        else {
            if (this.legRegistration.id >= 0) {

                this.checkpoint = appState.getCheckPointByRallyPunktAndLegRegsId(appState.rallyPunkt[appState.rallyPunktIndex] ? appState.rallyPunkt[appState.rallyPunktIndex].id : -1, this.legRegistration.id);
            }
            else {
                this.checkpoint = undefined;
            }


        }

    }

    render(): any {
        let numButtonStyle: CSSProperties = {
            paddingLeft: 24,
            paddingRight: 24,
            fontWeight: "normal",
            fontFamily: "monospace",
            marginTop: 5,
            marginLeft: 5
        }
        let clearButtonStyle: CSSProperties = {
            paddingLeft: 24,
            paddingRight: 24,
            fontWeight: "normal",
            fontFamily: "monospace",
            marginTop: 5,
            marginLeft: 5,
            color: "red"
        }
        let backButtonStyle: CSSProperties = {
            paddingLeft: 24,
            paddingRight: 24,
            fontWeight: "normal",
            fontFamily: "monospace",
            marginTop: 5,
            marginLeft: 5,
            color: "orange"
        }

        let saveEnabledClass = "hidden";
        if (appState.getIsCycleRally()) {
            let nextPunkt = appState.getNextCycleRallyPunkByLegRegsId(this.legRegistration.id);
            if (this.legRegistration.id >= 0 && nextPunkt)
                saveEnabledClass = "";
        }
        else {
            if (this.legRegistration.id >= 0 && this.checkpoint === undefined) {
                saveEnabledClass = "";
            }
        }

        return (
            <Modal>
                <div className="modal-header">
                    <h4 className="modal-title text-center">
                        Укажите номер машины,<br/>время {moment(this.props.finishTime).format("HH:mm:ss")}</h4>
                </div>
                <div className="modal-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-10 col-md-offset-1" style={{ fontSize:18}}>
                                <table style={{width:"100%"}}>
                                    <tbody>
                                    <tr>
                                        <td style={{textAlign:"center",padding:5}}>
                                            <span>N:</span>
                                            <span style={{  color: "teal",
                                            fontWeight: "bold",
                                            border: "teal solid 1px",
                                            padding: 3
                                         }}
                                            >
                                          {this.raceNumber}
                                       </span>

                                        </td>
                                        <td style={{padding:5}}>
                                            <span
                                                style={{color:"coral"}}>{this.legRegistration ? this.legRegistration.autoName : "" + "  "}</span>
                                            <span>{this.legRegistration ? this.legRegistration.pilotName : ""}</span>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="row" style={{ marginTop:20 }}>
                            <div className="col-md-10 col-md-offset-1">
                                <button className="btn btn-lg btn-default" style={numButtonStyle}
                                        onClick={()=>this.handleNumButtonClick("1")}>
                                    1
                                </button>
                                <button className="btn btn-lg btn-default" style={numButtonStyle}
                                        onClick={()=>this.handleNumButtonClick("2")}>
                                    2
                                </button>
                                <button className="btn btn-lg btn-default" style={numButtonStyle}
                                        onClick={()=>this.handleNumButtonClick("3")}>
                                    3
                                </button>
                            </div>
                            <div className="col-md-10 col-md-offset-1">
                                <button className="btn btn-lg btn-default" style={numButtonStyle}
                                        onClick={()=>this.handleNumButtonClick("4")}>
                                    4
                                </button>
                                <button className="btn btn-lg btn-default" style={numButtonStyle}
                                        onClick={()=>this.handleNumButtonClick("5")}>
                                    5
                                </button>
                                <button className="btn btn-lg btn-default" style={numButtonStyle}
                                        onClick={()=>this.handleNumButtonClick("6")}>
                                    6
                                </button>
                            </div>
                            <div className="col-md-10 col-md-offset-1">
                                <button className="btn btn-lg btn-default" style={numButtonStyle}
                                        onClick={()=>this.handleNumButtonClick("7")}>
                                    7
                                </button>
                                <button className="btn btn-lg btn-default" style={numButtonStyle}
                                        onClick={()=>this.handleNumButtonClick("8")}>
                                    8
                                </button>
                                <button className="btn btn-lg btn-default" style={numButtonStyle}
                                        onClick={()=>this.handleNumButtonClick("9")}>
                                    9
                                </button>
                            </div>
                            <div className="col-md-10 col-md-offset-1">
                                <button className="btn btn-lg btn-default" style={clearButtonStyle}
                                        onClick={()=>this.handleNumButtonClick("C")}>
                                    C
                                </button>
                                <button className="btn btn-lg btn-default" style={numButtonStyle}
                                        onClick={()=>this.handleNumButtonClick("0")}>
                                    0
                                </button>
                                <button className="btn btn-lg btn-default" style={backButtonStyle}
                                        onClick={()=>this.handleNumButtonClick("<")}>
                                    {"<"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button
                        type="button"
                        data-dismiss="modal"
                        className={"btn btn-primary "+saveEnabledClass}
                        onClick={()=>{
                            //this.props.checkpoint.checkTime=new Date(moment(this.props.checkpoint.checkTime).format("YYYY/MM/DD")+" "+$(this.checkTimeNative).val());
                            //this.props.checkpoint.syncOk=false;
                            appState.pushNewCheck(this.legRegistration.id, this.props.finishTime);
                            //let index=appState.finishList.findIndex((time:Date)=>{return time.getMilliseconds()===this.props.finishTime.getMilliseconds()});
                            let index=appState.finishList.indexOf(appState.finishList.find((time:Date)=>{return time.getMilliseconds()===this.props.finishTime.getMilliseconds()})!);
                            if (index<0)
                                alert("ошибка index<0");
                            else
                                appState.finishList.splice(index,1);

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