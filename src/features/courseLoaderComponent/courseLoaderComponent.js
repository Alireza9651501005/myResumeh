import { Component } from "react";
import StyleSheets from './style/courseloader.module.css'

function CourseLoaderComponent() {

    return (
        <div className={StyleSheets.loader}></div>
    )
}


export default CourseLoaderComponent;