import React from "react";
import LangContext,{AppLang} from "../../context/lang";

export default function ChangeLang() {
    return (
        <LangContext.Consumer>
            {({language,changeLang}) =>(
                <select value={language} onChange={changeLang}>
                    {Object.keys(AppLang).map((key,i) => {
                        return <option key={i} value={key}>{AppLang[key].name}</option>
                    })}
                </select>
            )
                // <div onClick={changeLang} style={{cursor:'pointer'}}>
                //     {AppLang[language].name}
                // </div>
            }
        </LangContext.Consumer>
    );
}