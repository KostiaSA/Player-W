// import * as React from "react";
// import * as ReactDOM from "react-dom";
// import {getDeepClone} from "../utils/getDeepClone";
//
//
// export interface IInputProps extends InputOptions {
//
// }
//
// export class Input extends React.Component<IInputProps,IInputProps> {
//     constructor(props: any, context: any) {
//         super(props, context);
//         this.props = props;
//         this.context = context;
//         this.state = getDeepClone<IInputProps>(this.props);
//     }
//
//     // handleTouchTap() {
//     //     this.setState({
//     //         open: true,
//     //     });
//     // }
//
//     native: Element;
//
//
//     componentDidMount() {
//         // if (!this.state.theme)
//         //     this.state.theme = "mobile";
//         //
//         // $(this.native).jqxInput(this.state);
//     };
//
//     render():any {
//
//         // const muiTheme = getMuiTheme({
//         //     palette: {
//         //         accent1Color: deepOrange500,
//         //     },
//         // });
//
//
//         return (
//             <input type="text" ref={(e:Element)=>this.native=e} style={{ fontSize:18 }}/>
//         );
//     }
//
// }