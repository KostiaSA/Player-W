import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Promise from "bluebird";
import {IModalProps} from "./Modal";
import {getRandomString} from "../utils/getRandomString";

export function showModal(modal: React.ReactElement<IModalProps>) {
    ReactDOM.render(
        modal,
        $("<div/>").appendTo("body")[0]
    );
}