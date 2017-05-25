import * as numbro from "numbro";
// import {IReq, IAns, GET_ENCRYPT_KEY_CMD} from "../api/api";
// import {appState} from "../AppState";
// import crypto = require("crypto-js");
// import {getIsCordovaApp} from "./getIsCordovaApp";
// import {config} from "../config/config";
//

export function getDeviceTimeZoneOffsetStr(): string {
    var offset = new Date().getTimezoneOffset();
    offset = -offset / 60;

    let x = numbro(offset).format("+0[.][0]");

    return "GMT " + x;

}
