import * as React from "react";
import * as ReactDOM from "react-dom";
import {observer} from "mobx-react";
import {appState} from "../AppState";
import {httpRequest} from "../utils/httpRequest";
import {observable} from "mobx";
import SyntheticEvent = React.SyntheticEvent;
import CSSProperties = React.CSSProperties;
import moment = require("moment");
import {ILegRegistration, ICheckPoint} from "../api/api";
import {CheckTimeUpdateModal} from "../modals/CheckTimeUpdateModal";
import {showModal} from "../modals/showModal";
import {getDeepClone} from "../utils/getDeepClone";


//import  NotifyResize = require("react-notify-resize");

export interface ICarsPageProps {

}

@observer
export class CarsPage extends React.Component<ICarsPageProps,any> {
    constructor(props: any, context: any) {
        super(props, context);
        this.props = props;
        this.context = context;
    }

    componentDidMount() {

    };

    getTotalCount(): number {
        return (appState.legRegistration || []).length;
    }

    getCheckedCount(): number {
        return appState.checkPoints.length;
    }

    render(): any {
        console.log("render Cars page");

        let gonkaStyle: CSSProperties = {
            color: "olive",
            fontWeight: "bold"
        };

        let timeStyle: CSSProperties = {
            color: "dodgerblue",
            fontWeight: "bold"
        };

        let userStyle: CSSProperties = {
            color: "forestgreen",
            fontWeight: "bold"
        };


        return (
            <div className="container">
                <div className="row" style={{ marginTop:20 }}>
                    <div className="col-md-10 col-md-offset-1">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4 className="text-center">
                                    <i className={"fa fa-car"} style={{fontSize:16, marginRight:10}}/>
                                    Участники этапа ({this.getCheckedCount()}/{this.getTotalCount()})
                                </h4>
                            </div>
                            <table className="table">
                                <thead>
                                <tr>
                                    <th style={{textAlign: "center"}}>старт</th>
                                    <th>пилот</th>
                                    <th style={{textAlign: "center"}}>номер</th>
                                    <th style={{textAlign: "center"}}>check</th>
                                </tr>
                                </thead>
                                <tbody>
                                { (appState.legRegistration || []).map((regItem: ILegRegistration, index: number) => {
                                    //let pilot = appState.getPilot(regItem.pilotId);
                                    let checkTime = "";
                                    let checkTimeColor = "green";
                                    let penaTime = "";
                                    let cp: ICheckPoint | undefined;
                                    if (appState.rallyPunkt[appState.rallyPunktIndex]) {
                                        cp = appState.getCheckPointByRallyPunktAndLegRegsId(appState.rallyPunkt[appState.rallyPunktIndex].id, regItem.id);
                                        if (cp) {
                                            checkTime = moment(cp.checkTime).format("HH:mm:ss");
                                            if (cp.syncOk !== true)
                                                checkTimeColor = "coral";
                                        }
                                    }

                                    let lastPunktTag:any=null;
                                    if (appState.getIsCycleRally()) {
                                        let lastPunkt = appState.getLastCycleRallyPunkByLegRegsId(regItem.id);
                                        if (lastPunkt) {
                                            cp = appState.getCheckPointByRallyPunktAndLegRegsId(lastPunkt.id, regItem.id);
                                            if (cp) {
                                                checkTime = moment(cp.checkTime).format("HH:mm:ss");
                                               // console.log("lastPunkt",getDeepClone(lastPunkt));
                                                lastPunktTag=<span style={{color: checkTimeColor}}>({lastPunkt.num+' '+lastPunkt.name})</span>
                                                if (cp.syncOk !== true)
                                                    checkTimeColor = "coral";

                                            }
                                        }
                                    }


                                    return (
                                        <tr key={index}>
                                            <td style={{textAlign: "center"}}>{index}</td>
                                            <td>
                                                <span style={{color: "coral"}}>{regItem.autoName}</span>
                                                <br/>
                                                <span>{regItem.pilotName}</span>
                                            </td>
                                            <td style={{textAlign: "center", color: "teal"}}>{regItem.raceNumber}</td>
                                            <td style={{textAlign: "center"}}
                                                onClick={()=>{
                                                    if (cp){
                                                      showModal(<CheckTimeUpdateModal checkpoint={cp} onClose={()=>{}}/>);
                                                    }
                                                }}
                                            >
                                                <span style={{color: checkTimeColor}}>{checkTime}</span>
                                                <br/>
                                                {lastPunktTag}
                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}