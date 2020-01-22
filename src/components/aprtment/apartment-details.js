import React from "react";
import LangContext,{AppLang} from "../../context/lang";
import {Table} from "react-bootstrap";
import {data} from "./data";


class ApartmentDetailsTable extends React.Component{

    render() {


        return (
            <LangContext.Consumer>
                {
                    ({language}) => {
                        const currentLang = AppLang[language];
                        const style = {direction: currentLang.dir};
                        const curData = data[language];
                        return (
                            <Table style={style}>
                                <thead className={'text-center'}>
                                <tr>
                                    {[curData.rooms, curData.baths, curData.sqft, curData.status, curData.price].map((data, i) => {
                                        return <th key={i}>{data}</th>
                                    })}
                                </tr>
                                </thead>
                                <tbody className={'text-center'}>
                                <tr>
                                    {[this.props.rooms, this.props.baths, this.props.sqft,curData[this.props.status], this.props.price].map((feild, i) => {
                                        return <td key={i}>{feild ? feild : 'Not Available'}</td>
                                    })}
                                </tr>
                                </tbody>
                            </Table>
                        );
                    }
                }

            </LangContext.Consumer>
        );
    }
}

export default ApartmentDetailsTable;