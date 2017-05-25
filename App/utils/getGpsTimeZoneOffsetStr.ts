import * as numbro from "numbro";
import {appState} from "../AppState";
// import {IReq, IAns, GET_ENCRYPT_KEY_CMD} from "../api/api";
// import {appState} from "../AppState";
// import crypto = require("crypto-js");
// import {getIsCordovaApp} from "./getIsCordovaApp";
// import {config} from "../config/config";
//

export function getGpsTimeZoneOffsetStr(): string {
    if (appState.rallySpecUch && appState.rallySpecUch[appState.currSpecUchIndex]) {
        var offset = appState.rallySpecUch[appState.currSpecUchIndex].timeZone;

        let x = numbro(offset).format("+0[.][0]");

        return "GMT " + x;
    }
    else
        return "GMT ?";

}
