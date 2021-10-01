import { Component } from "react";
import StyleSheets from './style/Homeloader.module.css'

function HomeLoaderComponent() {

    return (
        <div className={StyleSheets.loader}></div>
    )
}


export default HomeLoaderComponent;