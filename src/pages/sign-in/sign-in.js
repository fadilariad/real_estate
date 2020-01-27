import React from "react";
import LangContext, {AppLang} from "../../context/lang";
import {data} from "../../locals/translate/data";
import {Button, Col, Form, Row} from "react-bootstrap";

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
                        const curData = data[language];
                        return (
                            <Row style={style} className={' w-25 ml-auto mr-auto mt-5 '}>
                                <Col xs={12} className={'text-center'}>
                                    <Form.Label>{curData.email}</Form.Label>
                                    <Form.Control type={'email'}/>
                                </Col>
                                <Col xs={12} className={'text-center mt-2'}>
                                    <Form.Label>{curData.password}</Form.Label>
                                    <Form.Control type={'pass'} name={'password'}/>
                                </Col>
                                <Col xs={12} className={'text-center mt-2'}>
                                    <Button variant={'primary'} className={'w-100'}>{curData.login}</Button>
                                </Col>
                            </Row>
                        );
                    }
                }
            </LangContext.Consumer>
        );
    }
}

export default SignIn;