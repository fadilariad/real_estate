import React from "react";

const LangContext = React.createContext({
    language:'',
    changeLang: ()=>{},
});

export const AppLang = {
  en:{
      name:'English',
      label:'en',
      dir:'ltr'
  } ,
  he:{
      name:'עברית',
      label: 'he',
      dir:'rtl'
  }
};

export default LangContext;