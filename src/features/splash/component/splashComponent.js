import { Component } from "react";
import StyleSheets from "./style/Splash.module.css";


class SplashComponent extends Component {

    render() {
        return (
            <div className={StyleSheets.image}></div>
        );
    }
}

export default SplashComponent;