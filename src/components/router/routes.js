import React from "react";
import { Route,Switch, BrowserRouter as Router } from 'react-router-dom';
import HeaderNavBar from "../header-nav-bar/header-nav-bar";
import Home from "../../pages/home/home";
import Buy from "../../pages/buy/buy";
import Rent from "../../pages/rent/rent";
import AboutUs from "../../pages/about-us/about-us";
import SignIn from "../../pages/sign-in/sign-in";
import SignUp from "../../pages/sign-up/sign-up";


class Routes extends React.Component{
    render() {

        return (
            <Router>
                <React.Fragment>
                    <HeaderNavBar/>
                    <Switch>
                        <Route exact path="/:lang/buy" component={Buy}/>
                        <Route exact path="/:lang/rent" component={Rent}/>
                        <Route exact path="/:lang:about-us" component={AboutUs}/>
                        <Route exact path="/:lang:sign-in" component={SignIn}/>
                        <Route exact path="/:lang/sign-up" component={SignUp}/>
                        <Route exact path="/:lang" component={Home}/>
                    </Switch>
                </React.Fragment>
            </Router>
        );
    }
}

export default Routes;
