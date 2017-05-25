import * as React from "react";
import * as ReactDOM from "react-dom";
import {observer} from "mobx-react";
import {appState} from "../AppState";
import {httpRequest} from "../utils/httpRequest";
import {observable} from "mobx";
import SyntheticEvent = React.SyntheticEvent;
import CSSProperties = React.CSSProperties;
import {ILegRegistration, ICheckPoint} from "../api/api";
import moment = require("moment");
import {showModal} from "../modals/showModal";
import {CheckTimeUpdateModal} from "../modals/CheckTimeUpdateModal";
import {CheckTimeNewModal} from "../modals/CheckTimeNewModal";
import {SetFinishRaceNumberModal} from "../modals/SetFinishRaceNumberModal";


//import  NotifyResize = require("react-notify-resize");

export interface IFlagPageProps {

}

@observer
export class FlagPage2 extends React.Component<IFlagPageProps,any> {
    constructor(props: any, context: any) {
        super(props, context);
        this.props = props;
        this.context = context;
    }

    @observable raceNumber: string = "";
    @observable legRegistration: ILegRegistration = appState.getLegRegistrationByRaceNumber(this.raceNumber);
    //@observable pilot: IPilot = appState.getPilot(this.legRegistration.pilotId);
    @observable checkpoint: ICheckPoint | undefined;

    componentDidMount() {

        // setInterval(() => {
        //     $("#check-time").text(moment(new Date()).format("HH:mm:ss"));
        // }, 1000);

    };

    // handleNumButtonClick = (num: string) => {
    //     vibratePushButton();
    //     if (num === "C")
    //         this.raceNumber = "";
    //     else if (num === "<") {
    //         if (this.raceNumber.length > 0)
    //             this.raceNumber = this.raceNumber.substr(0, this.raceNumber.length - 1);
    //     }
    //     else {
    //         this.raceNumber += num;
    //     }
    //
    //     this.legRegistration = appState.getLegRegistrationByRaceNumber(this.raceNumber);
    //     //this.pilot = appState.getPilot(this.legRegistration.pilotId);
    //     this.checkpoint = appState.getCheckPointByRallyPunktAndLegRegsId(appState.rallyPunkt ? appState.rallyPunkt.id : -1, this.legRegistration.id);
    //
    //
    //     if (this.legRegistration.id >= 0 && this.checkpoint === undefined)
    //         vibrate([70, 70, 70, 70, 70]);
    //     else if (this.legRegistration.id >= 0 && this.checkpoint !== undefined)
    //         vibrate(300);
    //
    // }

    handleTimeClick = (finishTime: Date) => {
        showModal(<SetFinishRaceNumberModal finishTime={finishTime} onClose={()=>{}}/>);
        //     vibratePushButton();
        //     showModal(<CheckTimeNewModal checkpoint={appState.getNewCheck(this.legRegistration.id, appState.gonkaTime!)}
        //                                  onClose={()=>{}}/>);
        //     this.handleNumButtonClick("C");
    }

    handleCheckWithTimeClick = () => {
        appState.pushNewFinish(appState.gonkaTime!);
        //this.handleNumButtonClick("C");
    }

    // handleUpdateClick = () => {
    //     vibratePushButton();
    //     showModal(<CheckTimeUpdateModal checkpoint={this.checkpoint!} onClose={()=>{}}/>);
    //
    // }

    render(): any {

        let gonkaStyle: CSSProperties = {
            color: "olive",
            fontWeight: "bold"
        };

        let okButtonStyle: CSSProperties = {
            paddingLeft: 24,
            paddingRight: 24,
            fontWeight: "normal",
            marginLeft: 5,
            marginTop: 20,
        }

        let timeButtonStyle: CSSProperties = {
            paddingLeft: 24,
            paddingRight: 24,
            fontWeight: "normal",
            marginLeft: 5,
            marginTop: 5,
        }

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


        // let checkEnabledClass = "hidden";
        // let updateEnabledClass = "hidden";
        // if (this.legRegistration.id >= 0 && this.checkpoint === undefined) {
        //     checkEnabledClass = "";
        // }
        // else if (this.legRegistration.id >= 0 && this.checkpoint !== undefined) {
        //     updateEnabledClass = "";
        // }


        return (
            <div className="container">
                <div className="row" style={{ marginTop:20 }}>
                    <div className="col-md-10 col-md-offset-1">
                        <div className="panel panel-default">
                            <div className="panel-heading">

                                <h5 className="text-center" style={{marginTop:5, marginBottom:5}}><i
                                    className={"fa fa-flag-checkered"} style={{fontSize:20, marginRight:10}}></i>
                                    {"ПУНКТ: "} {appState.rallyPunkt[appState.rallyPunktIndex] ? appState.rallyPunkt[appState.rallyPunktIndex].NPP + ". " + appState.rallyPunkt[appState.rallyPunktIndex].num + " " + appState.rallyPunkt[appState.rallyPunktIndex].name + "  (" + appState.rallyPunkt[appState.rallyPunktIndex].length + " км)" : ""}
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row text-center">
                    <button className={"btn btn-lg btn-success"} style={okButtonStyle}
                            onClick={this.handleCheckWithTimeClick}>
                        check {moment(appState.gonkaTime).format("HH:mm:ss")}
                    </button>
                </div>
                <div className="row" style={{marginTop:30}}>
                    <table className="table">
                        <tbody>
                        { (appState.finishList || []).map((finishTime: Date, index: number) => {

                            return (
                                <tr key={index}>
                                    <td style={{textAlign: "center"}}>
                                        <button className={"btn btn-default"} style={timeButtonStyle}
                                                onClick={()=>{this.handleTimeClick(finishTime)}}>
                                            <i className="fa fa-flag-checkered"
                                               style={{fontSize: 16, color: "green", paddingLeft: 5, paddingRight: 5}}></i>
                                            <span
                                                style={{fontSize: 16, color: "green", paddingLeft: 5, paddingRight: 5}}>{moment(finishTime).format("HH:mm:ss")}</span>
                                        </button>

                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </div>

            </div>
        );
    }

}