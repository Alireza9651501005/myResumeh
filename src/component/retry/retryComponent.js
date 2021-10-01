import { Component } from "react";
import  StyleSheets from './style/Retry.module.css'

class RetryComponent extends Component {
    render() {
        return <div>
            <img className={StyleSheets.retryImg} />
        </div>
    }
}

export default RetryComponent;