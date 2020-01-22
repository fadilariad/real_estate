import React from "react";
import {withRouter} from 'react-router-dom';
import LangContext,{AppLang} from "../../context/lang";
import {data} from "./data";
import {Col, Row, Form, Button} from "react-bootstrap";
import ApartmentsApi from "../../api/apartments";

class SearchBar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            saleStatus:'',
            cities:'',
            city:'',
            minPrice:'',
            maxPrice:'',
            numRoom:'',
            numBath:'',
            saleStatusVal:'',
            sqft:''
        }
    }
    componentDidMount() {
        let {search} = this.props.location;
        search = new URLSearchParams(search);
        this.setState({
            city:search.get('city'),
            minPrice:search.get('minPrice'),
            maxPrice:search.get('maxPrice'),
            numRoom:search.get('numRooms'),
            numBath:search.get('numBath'),
            saleStatusVal:search.get('status'),
            sqft:search.get('sqft')
        });
        ApartmentsApi.get()
    }

    render() {

        const {saleStatus,cities,city,minPrice,maxPrice,numRoom,numBath,sqft,saleStatusVal} = this.state;
        const optionsNum = [1,2,3,4,5].map((data,i) => {
            return <option key={i} value={data}>{`${data}+`}</option>
        });
        return (
            <LangContext.Consumer>
                {
                    ({language}) =>{
                        const currentLang = AppLang[language];
                        const style = {direction:currentLang.dir};
                        const curData = data[language];
                        return (
                            <Form method={'GET'} action={'/apartments/page/1'}>
                                <Row  style={style}  className={'p-3 justify-content-around'}>
                                    <Col xs={12}  className={'d-flex text-center'}>
                                        <Form.Label>{curData.city}</Form.Label>
                                        <Form.Control as={'select'}  name={'city'} selected={city}>
                                            {cities && cities.map((data,i) =>{
                                                return <option key={i} value={data.id}>{data.name}</option>
                                            })}
                                        </Form.Control>
                                    </Col>
                                    <Col xs={12}  className={'d-flex text-center'}>
                                        <Form.Label>{curData.minPrice}</Form.Label>
                                        <Form.Control value={minPrice} type={'number'} name={'minPrice'} placeholder={curData.minPrice} />
                                    </Col>
                                    <Col xs={12}  className={'d-flex text-center'}>
                                        <Form.Label>{curData.maxPrice}</Form.Label>
                                        <Form.Control value={maxPrice} type={'number'}  name={'maxPrice'} placeholder={curData.maxPrice}/>
                                    </Col>
                                    <Col xs={12}  className='d-flex text-center'>
                                        <Form.Label>{curData.numRoom}</Form.Label>
                                        <Form.Control as={'select'} name={'numRoom'} selected={numRoom}>
                                            {optionsNum}
                                        </Form.Control>
                                    </Col>
                                    <Col xs={12} className={'d-flex text-center'}>
                                        <Form.Label>{curData.numBath}</Form.Label>
                                        <Form.Control as={'select'}  name={'numBath'} selected={numBath}>
                                            {optionsNum}
                                        </Form.Control>
                                    </Col>
                                    <Col xs={12} className={'d-flex text-center'}>
                                        <Form.Label>{curData.status}</Form.Label>
                                        <Form.Control as={'select'}  name={'status'} >
                                            {saleStatus && saleStatus.map((data,i) =>{
                                                return <option key={i} selected={saleStatusVal == data} value={data}>{curData[data]}</option>
                                            })}
                                        </Form.Control>
                                    </Col>
                                    <Col xs={12} className={'d-flex text-center'}>
                                        <Form.Label>{curData.sqft}</Form.Label>
                                        <Form.Control value={sqft} type={'text'}  name={'sqft'} placeholder={'Min Sqft'}  />
                                    </Col>
                                    <Col xs={12} className={'text-center d-flex align-items-end'}>
                                        <Button  type={'submit'}>{curData.search}</Button>
                                    </Col>
                                </Row>
                            </Form>
                        );
                    }
                }
            </LangContext.Consumer>
        );
    }
}

export default withRouter(SearchBar);