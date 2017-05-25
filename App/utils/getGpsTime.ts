///import * as Promise from "bluebird";
// import {IReq, IAns, GET_ENCRYPT_KEY_CMD} from "../api/api";
// import {appState} from "../AppState";
// import crypto = require("crypto-js");
// import {getIsCordovaApp} from "./getIsCordovaApp";
// import {config} from "../config/config";
//
// export function getGpsTime(): Promise<Date> {
//
//     return new Promise<Date>(
//         (resolve: (obj: Date) => void, reject: (error: string) => void) => {
//             if (getIsCordovaApp() && navigator.geolocation) {
//                 navigator.geolocation.getCurrentPosition(
//                     (pos: Position) => { // Ok
//                         resolve(new Date(pos.timestamp));
//                     },
//                     () => { // error
//                         reject("gps error");
//                     });
//             }
//             else {
//                 reject("no gps");
//             }
//
//         });
//
//
// }
