import { useState } from "react";
import NavBar from "../nav/nav";
import SingnOutComponent from "../../component/signoutComponent/SingnOutComponent";
import store from "../../store/store";
import MyCoursesComponent from "../myCourses/MyCourses";
import { useSelector } from "react-redux";
import MainHeader from "../../component/header/MainHeader";

const CoursesComponent = () => {

  const state = useSelector(state => state);
  const userLogIn = state.LogInReducer.isLogIn;

  return (
    <NavBar itemSelected="courses">

      {userLogIn ? <MyCoursesComponent /> :
        <div>
             <MainHeader title="دوره های من" />
          <SingnOutComponent />
        </div>
      }
    </NavBar>
  )
}

export default CoursesComponent;