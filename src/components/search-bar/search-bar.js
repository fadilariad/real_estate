import React from "react";
import {withRouter} from 'react-router-dom';
import LangContext,{AppLang} from "../../context/lang";
import {data} from "../../locals/translate/data";
import {Col, Row, Form, Button} from "react-bootstrap";
import ApartmentsApi from "../../api/apartments";
import CitiesApi from '../../api/cities';

class SearchBar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            inputs:{
                city:'',
                minPrice:'',
                maxPrice:'',
                numRoom:'',
                numBath:'',
                status:'',
                sqft:''
            },
            saleStatus:'',
            cities:'',

        }
    }
    componentDidMount() {
        let {search} = this.props.location;
        search = new URLSearchParams(search);
        this.setState({
            inputs:{
                city:+search.get('city'),
                minPrice:+search.get('minPrice'),
                maxPrice:search.get('maxPrice'),
                numRoom:+search.get('numRoom'),
                numBath:+search.get('numBath'),
                status:search.get('status'),
                sqft:search.get('sqft')
            }
        });
        ApartmentsApi.get('sale')
            .then(res => {
                this.setState({
                    saleStatus:res
                })
            }
        );
        CitiesApi.get('').then(res => {
            this.setState({
                cities:res
            })
            }

        );
    }
    handelInputChanges=(e)=>{
        const {name,value} = e.target;
        this.setState({
            inputs:{
                ...this.state.inputs,
                [name]:value
            }
        })
    };

    render() {

        const {saleStatus,cities} = this.state;
        const {city,minPrice,maxPrice,numRoom,numBath,sqft,status} = this.state.inputs;
        console.log(this.state.inputs)
        const optionsNum = [1,2,3,4,5].map((data,i) => {
            return <option key={i}  value={data}>{`${data}+`}</option>
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
                                <Row   style={style}  className={'p-3 flex-column'}>
                                    <Col xs={12} className={'text-center p-3 mb-2 border'}>
                                        <h5>{curData.location}</h5>
                                        <Form.Label>{curData.city}</Form.Label>
                                        <Form.Control as={'select'}  name={'city'} value={city} onChange={this.handelInputChanges}>
                                            {cities && cities.sort(function(a,b){
                                                const nameA = language === 'he' ? a.hebrew_name.toLowerCase() : a.english_name.toLowerCase();
                                                const nameB = language === 'he' ? b.hebrew_name.toLowerCase() : b.english_name.toLowerCase();
                                                if (nameA < nameB) {return -1;}
                                                if (nameA > nameB) {return 1;}
                                                return 0;
                                            }).map((data,i) =>{
                                                return <option key={i} value={data.id}>{language === 'he'? data.hebrew_name : data.english_name}</option>
                                            })}
                                        </Form.Control>
                                    </Col>
                                    <Col xs={12} className={'p-3 mt-2 mb-2 text-center border'}>
                                        <h5>{curData.price}</h5>
                                        <div className={'d-flex'}>
                                            <div className={'ml-1 mr-1'}>
                                                <Form.Label>{curData.minPrice}</Form.Label>
                                                <Form.Control value={minPrice} type={'number'} name={'minPrice'} placeholder={curData.minPrice} onChange={this.handelInputChanges} />
                                            </div>
                                            <div className={'ml-1 mr-1'}>
                                                <Form.Label>{curData.maxPrice}</Form.Label>
                                                <Form.Control value={maxPrice} type={'number'}  name={'maxPrice'} placeholder={curData.maxPrice} onChange={this.handelInputChanges}/>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={12} className={'p-3 mt-2 mb-2 text-center border'}>
                                        <div className={'d-flex flex-column'}>
                                            <div className={'d-flex justify-content-around'}>
                                                <div>
                                                    <Form.Label>{curData.numRoom}</Form.Label>
                                                    <Form.Control as={'select'} name={'numRoom'} value={numRoom ? numRoom : 1} onChange={this.handelInputChanges}>
                                                        {optionsNum}
                                                    </Form.Control>
                                                </div>
                                                <div>
                                                    <Form.Label>{curData.numBath}</Form.Label>
                                                    <Form.Control as={'select'}  name={'numBath'} value={numBath ? numBath : 1}  onChange={this.handelInputChanges}>
                                                        {optionsNum}
                                                    </Form.Control>
                                                </div>
                                            </div>
                                            <div className={'d-flex justify-content-between pt-1'}>
                                                <div>
                                                    <Form.Label>{curData.sqft}</Form.Label>
                                                    <Form.Control value={sqft} type={'text'}  name={'sqft'} placeholder={'Min Sqft'} onChange={this.handelInputChanges} />
                                                </div>
                                                <div>
                                                    <Form.Label>{curData.status}</Form.Label>
                                                    <Form.Control as={'select'}  name={'status'} onChange={this.handelInputChanges}>
                                                        {saleStatus && saleStatus.map((data,i) =>{
                                                            return <option key={i}  value={data}>{curData[data]}</option>
                                                        })}
                                                    </Form.Control>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                    <Col xs={12}  className={'text-center d-flex align-items-end'}>
                                        <Button className={'w-100'}  type={'submit'}>{curData.search}</Button>
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