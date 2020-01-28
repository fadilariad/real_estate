import React from "react";
import {withRouter} from 'react-router-dom';
import LangContext,{AppLang} from "../../../context/lang";
import {data} from "../../../locals/translate/data";
import {Alert, Button, Col, Form, Row} from "react-bootstrap";
import UsersApi from '../../../api/users';
import UserContext from "../../../context/user";
class LoginForm extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            email:'',
            pass:'',
            errorLog:false
        }
    }
    handelInputsValue = (e) => {
        const {name,value} = e.target;
        this.setState({
            [name] : value
        });
    };


    render() {
        const {errorLog} = this.state;
        return (
            <LangContext.Consumer>
                {
                    ({language}) => {
                        const currentLang = AppLang[language];
                        const style = {direction:currentLang.dir};
                        const curData = data[language];

                        return (
                            <UserContext.Consumer>
                                {
                                    ({loginUser}) =>{
                                        const handelSubmit = (e)=>{
                                            e.preventDefault();
                                            const {email,pass} = this.state;
                                            UsersApi.post('/login',{email,pass})
                                                .then(res => {
                                                    if (res.status === 200){
                                                        const {history} = this.props;
                                                        const {id,name} = res.data;
                                                        loginUser(id,name);
                                                        history.push(`/users/${id}`);
                                                    }else {
                                                        this.setState({errorLog:true})
                                                    }
                                                })
                                        };
                                        return (

                                            <Form onSubmit={handelSubmit}>
                                                <Row style={style} className={''}>
                                                    <Col  className={'text-center m-5'}><h1>{curData.login}</h1></Col>
                                                    {errorLog &&<Col xs={12}> <Alert className={'text-center'} variant={'danger'}>{curData.erroLog}</Alert></Col>}
                                                    <Col xs={12} className={'text-center'}>
                                                        <Form.Label>{curData.email}</Form.Label>
                                                        <Form.Control type={'email'} name={'email'} onBlur={this.handelInputsValue}/>
                                                    </Col>
                                                    <Col xs={12} className={'text-center mt-2'}>
                                                        <Form.Label>{curData.password}</Form.Label>
                                                        <Form.Control type={'password'} name={'pass'}  onBlur={this.handelInputsValue}/>
                                                    </Col>
                                                    <Col xs={12} className={'text-center mt-2'}>
                                                        <Button type={'submit'} variant={'primary'} className={'w-100'}>{curData.login}</Button>
                                                    </Col>
                                                </Row>
                                            </Form>
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

export default withRouter(LoginForm);

