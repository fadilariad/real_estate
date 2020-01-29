import React from "react";
import LangContext,{AppLang} from "../../context/lang";
import MainImg from '../../locals/images/home-page.jpg';
import {Container} from "react-bootstrap";
import './style.css';
import {data} from "../../locals/translate/data";
import ApartmentsApi from "../../api/apartments";
import {withRouter} from 'react-router-dom';
 class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            statistics:''
        }
    }
    componentDidMount() {
        ApartmentsApi.getDataForHomePage()
            .then(res => {
                this.setState({
                    statistics:res
                });
        });
    }
     handelCircleClick =(e) => {
        const {history} = this.props;
        const {id} = e.target;
        history.push(`/apartments/page/1?type=${id}`)
     };
    render() {
        const {statistics} = this.state;
        return (
            <LangContext.Consumer>
                {
                    ({language}) =>{
                        const currentLang = AppLang[language];
                        const style = {direction: currentLang.dir};
                        const curData = data[language];
                        return(
                            <div style={style}>
                                <div  className={'text-center mt-2 mb-2'}><h2 className={'multi-color-text'}>{curData.homePageHeader}</h2></div>
                                <Container>
                                    <img className={'w-100 main-image'} height={500} src={MainImg}/>
                                    <div className={'d-flex justify-content-around'}>
                                        {['house', 'ranch', 'condo', 'land'].map((type,i) => {
                                           const bg=['bg-success','bg-danger','bg-warning','bg-primary'];
                                            return <div key={i}
                                                        className={`${bg[i]} rounded-circle 
                                                        circles 
                                                        text-white
                                                        d-flex justify-content-center 
                                                        align-items-center mt-3 mb-3`}>
                                                <div id={type} onClick={this.handelCircleClick} className={'font20px w-100 pointer text-center'}>{curData[type]}</div>
                                            </div>
                                        })}
                                    </div>
                                    <h2 className={'mt-3 text-center text-success'}>{curData.statisticsHeader}</h2>

                                    {
                                        statistics  && <div className={'d-flex justify-content-around'}>
                                            {
                                                Object.keys(statistics).map((data,i) => {
                                                    return <div key={i} className={'text-primary mt-3 pt-5 pb-5 text-center'}>
                                                        <div><h5>{statistics[data]}</h5></div>
                                                        <div><h4>{curData[data]}</h4></div>
                                                    </div>
                                                })
                                            }
                                        </div>
                                    }
                                </Container>

                            </div>
                        );
                    }
                }

            </LangContext.Consumer>
        );
    }
}

export default withRouter(Home);