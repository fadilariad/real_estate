import React from "react";
import {withRouter} from "react-router";
import LangContext,{AppLang} from "../../context/lang";
import {Button, Card, Col} from "react-bootstrap";
import {data} from "./data";
import './style.css';


class Apartment extends React.Component{
    handelMoreDetails = () =>{
      const {id,history} = this.props;
      history.push(`/apartments/${id}`);
    };

    render() {
        const {sale_status:title,main_image:image,number_of_room:rooms,number_of_bath:baths,address,price,animation} = this.props;
        return (
            <LangContext.Consumer>
                {
                    ({language}) => {
                        const currentLang = AppLang[language];
                        const style = {direction:currentLang.dir,...animation};
                        const curData = data[language];
                        return (
                            <Col xs={12} sm={12} md={6} lg={4} xl={3} className={'pointer mt-4 card-animation'} style={style}>
                                <Card  className={'h-100'}>
                                    <div className={'position-relative '}>
                                        <Card.Img  src={`/${image}`}  variant={'top'}  />
                                        <span className={'position-absolute apartment-title p-1 bg-success'}>{curData[title]}</span>
                                        <h3 className={'position-absolute apartment-price bg-transparent'}>{price}</h3>
                                    </div>
                                    <Card.Body>
                                        <Card.Text as={'div'}>
                                            <div className={'d-flex'}><div>{`${curData.address}:`}</div><div className={'ml-2 mr-2'} >{address}</div></div>
                                            <div className={'d-flex'}><div>{`${curData.rooms}:`}</div><div className={'ml-2 mr-2'} >{rooms}</div></div>
                                            <div className={'d-flex'}><span>{`${curData.baths}:`}</span><span className={'ml-2 mr-2'} >{baths}</span></div>
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <Button variant={'primary'} className={'w-100'} onClick={this.handelMoreDetails}>{curData.details}</Button>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        );
                    }
                }
            </LangContext.Consumer>

        );
    }
}

export default withRouter(Apartment);