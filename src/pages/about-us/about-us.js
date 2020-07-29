import React from "react";
import LangContext,{AppLang} from "../../context/lang";
import {data} from "../../locals/translate/data";

export default class AboutUs extends React.Component{
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <LangContext>
                {
                    ({language})=>{
                        const currentLang = AppLang[language];
                        const style = {direction: currentLang.dir};
                        const curData = data[language];
                        return(
                            <div style={style} className={'w-50 ml-auto mr-auto mt-5 text-center'}>
                               <p> {curData.aboutUsText} </p>
                            </div>
                        );
                    }
                }
            </LangContext>
        );
    }
}