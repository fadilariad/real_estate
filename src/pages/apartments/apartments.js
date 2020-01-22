import React from "react";
import {withRouter} from 'react-router-dom';
import {Col, Row} from "react-bootstrap";
import Apartment from "../../components/aprtment/apartment";
import ApartmentsApi from '../../api/apartments';
import Pages from "../../components/pages/pages";
import SearchBar from "../../components/search-bar/search-bar";
import LangContext,{AppLang} from "../../context/lang";


 class Apartments extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            limit:8,
            active:this.props.match.params.page ? +this.props.match.params.page : 1
        }
    }
     componentDidMount() {
        const page = this.state.active;
         const {search} = this.props.location;
        ApartmentsApi.get(`page/${page+search}`).then(res => {
            const {rows,count} = res;
            this.setState({res:rows,count:count});
        });
    }

    render() {
        const {res,count,limit,active} = this.state;
        const totalPages = Math.ceil(count / limit);

        return (
            <LangContext.Consumer>
                {
                    ({language}) => {
                        const currentLang = AppLang[language];
                        const style = {direction: currentLang.dir};
                        return (
                            <Row style={style} className={'p-5'}>
                                <SearchBar/>
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
