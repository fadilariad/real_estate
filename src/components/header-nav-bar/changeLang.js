import React from "react";
import LangContext,{AppLang} from "../../context/lang";

export default function ChangeLang() {
    return (
        <LangContext.Consumer>
            {({language,changeLang}) => (
                <div onClick={changeLang} style={{cursor:'pointer'}}>
                    {AppLang[language].name}
                </div>
            )}
        </LangContext.Consumer>
    );
}