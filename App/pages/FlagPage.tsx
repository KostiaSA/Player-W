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


//import  NotifyResize = require("react-notify-resize");

export interface IFlagPageProps {

}

@observer
export class FlagPage extends React.Component<IFlagPageProps,any> {
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
        //     $("#check-time").text(moment(appState.gonkaTime).format("HH:mm:ss"));
        // }, 1000);

    };

    appState_rallyPunktIndex(): number {
        if (appState.getIsCycleRally())
            return 0;
        else
            return appState.rallyPunktIndex;
    }

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
        if (this.legRegistration.id >= 0) {
            //this.pilot = appState.getPilot(this.legRegistration.pilotId);
            this.checkpoint = appState.getCheckPointByRallyPunktAndLegRegsId(appState.rallyPunkt[this.appState_rallyPunktIndex()] ? appState.rallyPunkt[this.appState_rallyPunktIndex()].id : -1, this.legRegistration.id);
        }
        else
            this.checkpoint = undefined;
        //console.log("this.checkpoint",this.checkpoint);
        //console.log("legRegsId",this.checkpoint!.legRegsId)



    }

    handleCheckClick = () => {

        // срезаем секунды
        let gonkaTime= moment(appState.gonkaTime!) as any;
        gonkaTime.milliseconds(0);
        gonkaTime.seconds(0);
        let gonkaTime2=gonkaTime.toDate();

        showModal(<CheckTimeNewModal checkpoint={appState.getNewCheck(this.legRegistration.id, gonkaTime2)}
                                     onClose={()=>{}}/>);
        this.handleNumButtonClick("C");
    }

    handleCheckWithTimeClick = () => {

        // срезаем секунды
        let gonkaTime= moment(appState.gonkaTime!) as any;
        gonkaTime.milliseconds(0);
        gonkaTime.seconds(0);
        let gonkaTime2=gonkaTime.toDate();

        appState.pushNewCheck(this.legRegistration.id, gonkaTime2);
        this.handleNumButtonClick("C");
    }

    handleUpdateClick = () => {
        showModal(<CheckTimeUpdateModal checkpoint={this.checkpoint!} onClose={()=>{}}/>);

    }

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


        let checkEnabledClass = "hidden";
        let updateEnabledClass = "hidden";
        if (this.legRegistration.id >= 0 && this.checkpoint === undefined) {
            checkEnabledClass = "";
        }
        else if (this.legRegistration.id >= 0 && this.checkpoint !== undefined) {
            updateEnabledClass = "";
        }


        return (
            <div className="container">
                <div className="row" style={{ marginTop:20 }}>
                    <div className="col-md-10 col-md-offset-1">
                        <div className="panel panel-default">
                            <div className="panel-heading">

                                <h5 className="text-center" style={{marginTop:5, marginBottom:5}}><i
                                    className={"fa fa-flag-checkered"} style={{fontSize:20, marginRight:10}}></i>
                                    {"ПУНКТ: "} {appState.rallyPunkt[this.appState_rallyPunktIndex()] ? appState.rallyPunkt[this.appState_rallyPunktIndex()].NPP + ". " + appState.rallyPunkt[this.appState_rallyPunktIndex()].num + " " + appState.rallyPunkt[this.appState_rallyPunktIndex()].name + "  (" + appState.rallyPunkt[this.appState_rallyPunktIndex()].length + " км)" : ""}
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
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
                                    <div style={{ color:"green"}}>
                                        { this.checkpoint ? "start: " + moment(this.checkpoint.checkTime).format("HH:mm:ss") : ""}
                                    </div>
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
                <div className="row">
                    <div className="col-md-10 col-md-offset-1" style={{ fontSize:18}}>
                        <button className={"btn btn-lg btn-success "+checkEnabledClass}
                                style={okButtonStyle}
                                onClick={this.handleCheckClick}>
                            start
                        </button>
                        <button className={"btn btn-lg btn-success "+checkEnabledClass} style={okButtonStyle}
                                onClick={this.handleCheckWithTimeClick}>
                            start {moment(appState.gonkaTime).format("HH:mm")}:00
                        </button>
                    </div>
                    <div className="col-md-10 col-md-offset-1" style={{ fontSize:18}}>
                        <button className={"btn btn-lg btn-primary "+updateEnabledClass}
                                style={okButtonStyle}
                                onClick={this.handleUpdateClick}>
                            исправить время
                        </button>
                    </div>
                </div>

            </div>
        );
    }

}