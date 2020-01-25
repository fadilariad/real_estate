import React from "react";
import LangContext,{AppLang} from "../../context/lang";
import {Table} from "react-bootstrap";
import {data} from '../../locals/translate/data';
import {translate} from "../../locals/translate/translate";


class ApartmentDetailsTable extends React.Component{

    render() {

        const {sale_status:status, main_image:image, number_of_room:rooms, number_of_bath:baths, address, price, sqft,city,property_type: type,created_on} = this.props;
        const date = new Date(created_on).toLocaleDateString();
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
                                        {[curData.city, curData.address, curData.type, curData.uploadDate].map((data, i) => {
                                            return <th key={i}>{data}</th>
                                        })}
                                    </tr>
                                    </thead>
                                    <tbody className={'text-center'}>
                                    <tr>
                                        {[city[language],translate(address,language),curData[type],date].map((feild, i) => {
                                            return <td key={i}>{feild ? feild : 'Not Available'}</td>
                                        })}
                                    </tr>
                                    </tbody>
                                    <thead className={'text-center'}>
                                    <tr>
                                        {[curData.rooms, curData.baths, curData.sqft, curData.status, curData.price].map((data, i) => {
                                            return <th key={i}>{data}</th>
                                        })}
                                    </tr>
                                    </thead>
                                    <tbody className={'text-center'}>
                                    <tr>
                                        {[rooms,baths,sqft,curData[status],price].map((feild, i) => {
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