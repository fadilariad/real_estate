import React from "react";
import { Route,Switch, BrowserRouter as Router } from 'react-router-dom';
import HeaderNavBar from "../header-nav-bar/header-nav-bar";
import Home from "../../pages/home/home";
import Apartments from "../../pages/apartments/apartments";
import AboutUs from "../../pages/about-us/about-us";
import SignIn from "../../pages/sign-in/sign-in";
import SignUp from "../../pages/sign-up/sign-up";
import ApartmentPage from "../../pages/apartment/apartment";


class Routes extends React.Component{
    render() {

        return (
            <Router>
                <React.Fragment>
                    <HeaderNavBar/>
                    <Switch>
                        <Route exact path="/apartments/page/:page" component={Apartments}/>
                        <Route exact path="/apartments/page" component={Apartments}/>
                        <Route exact path="/apartments/:id" component={ApartmentPage}/>
                        <Route exact path="/about-us" component={AboutUs}/>
                        <Route exact path="/sign-in" component={SignIn}/>
                        <Route exact path="/sign-up" component={SignUp}/>
                        <Route exact path="/" component={Home}/>
                    </Switch>
                </React.Fragment>
            </Router>
        );
    }
}

export default Routes;
