import { Component } from "react";
import StyleSheets from './style/Loader.module.css'

function LoaderComponent() {

    return (
        <div className={StyleSheets.loader}></div>
        // <div className={StyleSheets.loader}>
        //     <div className="spinner-grow text-muted"></div>
        //     <div className="spinner-grow text-muted"></div>
        //     <div className="spinner-grow text-muted"></div>
        // </div>
    )
}


export default LoaderComponent;