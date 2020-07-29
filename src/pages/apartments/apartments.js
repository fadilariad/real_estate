import React from "react";
import {withRouter} from 'react-router-dom';
import {Button, Col, Modal, Row} from "react-bootstrap";
import Apartment from "../../components/aprtment/apartment";
import ApartmentsApi from '../../api/apartments';
import Pages from "../../components/pages/pages";
import SearchBar from "../../components/search-bar/search-bar";
import LangContext,{AppLang} from "../../context/lang";
import {data} from "../../locals/translate/data";


class Apartments extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            limit:8,
            active:this.props.match.params.page ? +this.props.match.params.page : 1,
            toggleSearch:false,
            search:''
        }
    }
    componentDidMount() {
        const page = this.state.active;
        let {search} = this.props.location;
        search = new URLSearchParams(search);
        this.setState({
            inputs:{
                minPrice:+search.get('minPrice'),
                maxPrice:search.get('maxPrice'),
                numRoom:+search.get('numRoom'),
                numBath:+search.get('numBath'),
                status:search.get('status'),
                sqft:search.get('sqft'),
                type:search.get('type')
            }
        },() => {
            let search ={};
            for (const input in this.state.inputs){
                if (this.state.inputs[input]){
                    search[input] = this.state.inputs[input];

            }
            this.setState({
                search:search
            });}
        });

        ApartmentsApi.get(`page/${page}?${search}`).then(res => {
            const {rows,count} = res;
            this.setState({res:rows,count:count});
        });
    }
    render() {
        const {res,count,limit,active,toggleSearch,search} = this.state;
        const totalPages = Math.ceil(count / limit);

        return (
            <LangContext.Consumer>
                {
                    ({language}) => {
                        const currentLang = AppLang[language];
                        const style = {direction: currentLang.dir};
                        const curData = data[language];
                        const searchPars = ()=>{
                            let res = ', ';
                            for (const input in search){
                                res += `${curData[input]}: ${curData[search[input]] ? curData[search[input]] : search[input]},  `;
                                }
                            return res;
                        };

                        return (
                            <Row style={style} className={'p-5'}>
                                <Col xs={12}>
                                    <Row className={'justify-content-between'}>
                                        <Col xs={"auto"}><small>{`${curData.found} ${count ? count : 0} ${curData.apartments} ${searchPars()}`}</small></Col>
                                        <Col xs={"auto"}><Button variant={'outline-secondary'} onClick={()=>{this.setState({toggleSearch:true})}}>{curData.advancedSearch}</Button></Col>
                                    </Row>
                                    <Modal show={toggleSearch}>
                                        <Modal.Header  style={style}>
                                            <Modal.Title className={'d-flex justify-content-between w-100'}>
                                                    <div>{curData.advancedSearch}</div>
                                                    <div>
                                                        <Button variant={'danger'} onClick={()=>{this.setState({toggleSearch:false})}}>{curData.cancel}</Button>
                                                    </div>
                                            </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <SearchBar/>
                                        </Modal.Body>
                                    </Modal>
                                </Col>
                                {res && Object.values(res).map((data,i) => {

                                    return <Apartment key={i} animation={{animationDelay: `${0.2 *i}s` } } {...data}/>
                                })}
                                <Col xs={12}>
                                    <div className={'d-flex justify-content-center mt-2'}>
                                        <Pages  count={totalPages}
                                                active={active}
                                        />
                                    </div>
                                </Col>

                            </Row>
                        );
                    }
                }
            </LangContext.Consumer>
        );
    }
}

export default withRouter(Apartments);
