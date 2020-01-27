import React from 'react';
import LangContext from "./context/lang";
import Routes from "./components/router/routes";

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            changeLanguage: false
        };
    }

    changeLang = (e) => {
        localStorage.setItem('curLang',e.target.value);
      this.setState({changeLanguage:!this.state.changeLanguage})
    };
    render() {
        return (

            <LangContext.Provider value={{language: localStorage.getItem('curLang') ? localStorage.getItem('curLang') : 'en', changeLang: this.changeLang}}>
                <Routes/>
            </LangContext.Provider>

        );
    }


}

export default App;