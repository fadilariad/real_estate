import React from "react";
import LangContext,{AppLang} from "../../context/lang";
import {Carousel, Container, Tab, Tabs, Spinner, Row, Col} from "react-bootstrap";
import ApartmentsApi from "../../api/apartments";
import {data} from '../../locals/translate/data';
import ApartmentDetailsTable from "../../components/aprtment/apartment-details";
import {translate} from "../../locals/translate/translate";

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
        const {images, user} = this.state.response;

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
                            <Container className={'mt-3 mb-3'}>
                                {isLoading ? <div className={'d-flex justify-content-center'}><Spinner  animation="border" role="status" >
                                        <span className="sr-only">Loading...</span>
                                    </Spinner> </div>:
                                    <Tabs style={style} defaultActiveKey={'images'} id={'uncontrolled'}>

                                        <Tab style={tabStyle} title={curData.images} eventKey={'images'}>
                                            <Carousel fade={true} className={'w-75 m-auto pt-5 pb-5'}>
                                                { carouselItemLoop}
                                            </Carousel>
                                        </Tab>
                                        <Tab style={tabStyle} title={curData.details} eventKey={'Details'}>

                                            <ApartmentDetailsTable {...this.state.response}/>
                                        </Tab>
                                        <Tab style={tabStyle} title={curData.purchase} eventKey={'Purchase'}>
                                            <Row style={{...style,float:currentLang.float,width:'100%'}}>
                                                <Col xs={12} className={'text-center'}><h1>{curData.agentDetails}</h1></Col>
                                                <Col xs={12} className={'d-flex'}><div>{curData.name}:</div><div className={'ml-1 mr-1'}>{`${translate(user.first_name,language)}  ${translate(user.last_name,language)}`}</div></Col>
                                                <Col xs={12} className={'d-flex'}><div>{curData.email}:</div><div className={'ml-1 mr-1'}>{user.email}</div> </Col>
                                                <Col xs={12} className={'d-flex'}><div>{curData.phone}:</div><div className={'ml-1 mr-1'}>{user.phone}</div></Col>
                                            </Row>
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


