// import * as React from "react";
// import * as ReactDOM from "react-dom";
// import {getDeepClone} from "../utils/getDeepClone";
//
//
// export interface IButtonProps extends ButtonOptions {
//
// }
//
// export class Button extends React.Component<IButtonProps,IButtonProps> {
//     constructor(props: any, context: any) {
//         super(props, context);
//         this.props = props;
//         this.context = context;
//         this.state = getDeepClone<IButtonProps>(this.props);
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
//         if (!this.state.theme)
//             this.state.theme = "ios";
//
//
//         $(this.native).jqxButton(this.state);
//     };
//
//     render() {
//
//         // const muiTheme = getMuiTheme({
//         //     palette: {
//         //         accent1Color: deepOrange500,
//         //     },
//         // });
//
//
//         return (
//             <button ref={(e:Element)=>this.native=e}>Это пиздец</button>
//         );
//     }
//
// }