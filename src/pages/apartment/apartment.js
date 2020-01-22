import React from "react";
import LangContext,{AppLang} from "../../context/lang";
import {Carousel, Container, Tab, Tabs, Row,  Spinner} from "react-bootstrap";
import ApartmentsApi from "../../api/apartments";
import {data} from './data';
import ApartmentDetailsTable from "../../components/aprtment/apartment-details";

class ApartmentPage extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            isLoading:true,
            response:'',
            images:''
        }
    }
    componentDidMount() {
        const {match:{params}} = this.props;
        const id = +params.id;
        ApartmentsApi.get(id)
            .then(res => {
                this.setState({
                    response : res,
                    isLoading: false
                })
            });
    }
    render() {
        const {isLoading} = this.state;
        const {
            sale_status:title,
            main_image:image,
            number_of_room:rooms,
            number_of_bath:baths,
            address,
            price,
            sqft,
            images
        } = this.state.response;

        const tabStyle = {
            height: '500px',
            paddingTop:'20px'
        };
        const imageStyle = {
            width:'100%',
            height: '400px'
        };
        const carouselItemLoop = images &&  images.map((data,i) => {
            return <Carousel.Item key={i} ><img  style={imageStyle} src={`/${data.url}`} alt={'/'}/></Carousel.Item>});

        return(
            <LangContext.Consumer>
                {
                    ({language}) =>{
                        const currentLang = AppLang[language];
                        const style = {direction:currentLang.dir};
                        const curData = data[language];
                        return (
                            <Container   className={'mt-3 mb-3'}>
                                {isLoading ? <Spinner animation="border" role="status" >
                                        <span className="sr-only">Loading...</span>
                                    </Spinner> :
                                    <Tabs style={style} defaultActiveKey={'images'} id={'uncontrolled'}>

                                        <Tab style={tabStyle} title={curData.images} eventKey={'images'}>
                                            <Carousel fade={true} className={'w-75 m-auto pt-5 pb-5'}>
                                                { carouselItemLoop}
                                            </Carousel>
                                        </Tab>
                                        <Tab style={tabStyle} title={curData.details} eventKey={'Details'}>
                                            <ApartmentDetailsTable {...{status:title,rooms,baths,price,sqft}}/>
                                        </Tab>
                                        <Tab style={tabStyle} title={curData.address} eventKey={'Address'}>
                                            <Row className={'justify-content-center'}>
                                                {/*<Col xs={"auto"}> <img height={300} src={city.image} alt={'/'}/> </Col>*/}
                                                {/*<Col xs={"auto"}>*/}
                                                {/*    {[`City: ${city.label}`,`Address: ${address}`,`Country: ${city.country}`,`Description: ${city.description}`].map((data,i) =>{*/}
                                                {/*        return <div>{data}</div>*/}
                                                {/*    })}*/}
                                                {/*</Col>*/}
                                            </Row>
                                        </Tab>
                                        <Tab style={tabStyle} title={curData.purchase} eventKey={'Purchase'}>
                                            <div></div>
                                        </Tab>
                                    </Tabs> }
                            </Container>
                        );
                    }
                }
            </LangContext.Consumer>

        );
    }
}

export default ApartmentPage;


