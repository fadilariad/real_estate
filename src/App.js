import React from 'react';
import LangContext from "./context/lang";
import UserContext from "./context/user";
import Routes from "./components/router/routes";

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            toggle: false
        };
    }

    changeLang = (e) => {
        localStorage.setItem('curLang',e.target.value);
        this.setState({toggle:!this.state.toggle})
    };
    loginUser = (id,name,type) =>{
        const realStateUser = {
            id:id,
            name:name,
            type:type
        };
        localStorage.setItem('realStateUser',JSON.stringify(realStateUser));
        this.setState({toggle:!this.state.toggle});
    };
    logOutUser=()=>{
        localStorage.removeItem('realStateUser');
        this.setState({toggle:!this.state.toggle});
    };
    render() {
        return (

            <LangContext.Provider value={
                {
                    language: localStorage.getItem('curLang') ? localStorage.getItem('curLang') : 'en',
                    changeLang: this.changeLang
                }}>
                <UserContext.Provider value={
                    {
                        user:localStorage.getItem('realStateUser') ? JSON.parse(localStorage.getItem('realStateUser')) : '',
                        loginUser:this.loginUser,
                        logOut:this.logOutUser} }>
                    <Routes/>
                </UserContext.Provider>
            </LangContext.Provider>

        );
    }


}

export default App;