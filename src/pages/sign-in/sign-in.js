import React from "react";
import LangContext, {AppLang} from "../../context/lang";
import UserContext from "../../context/user";
import LoginForm from "../../components/forms/login-form/login";
import {Col, Row} from "react-bootstrap";



class SignIn extends React.Component{
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return(
            <LangContext.Consumer>
                {
                    ({language}) => {
                        const currentLang = AppLang[language];
                        const style = {direction:currentLang.dir};
                        return (
                            <UserContext.Consumer>
                                {
                                    ({loginUser}) =>{
                                        return (

                                            <Row style={style} className={'justify-content-center  '}>
                                                <Col xs={4}><LoginForm/></Col>
                                            </Row>
                                        );
                                    }
                                }
                            </UserContext.Consumer>
                        );
                    }
                }
            </LangContext.Consumer>
        );
    }
}

export default SignIn;
