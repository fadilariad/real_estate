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

    changeLang = () => {
      const language = localStorage.getItem('curLang');
      if (!language || language === 'en') {
          localStorage.setItem('curLang', 'he');
      }else {
          localStorage.setItem('curLang', 'en');
      }
      this.setState({changeLanguage:!this.state.changeLanguage})
    };
    render() {
        return (

            <LangContext.Provider value={{language: (localStorage.getItem('curLang') || 'en'), changeLang: this.changeLang}}>
                <Routes/>
            </LangContext.Provider>

        );
    }


}

export default App;