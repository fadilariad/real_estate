import React from "react";
import {withRouter} from 'react-router-dom';
import LangContext,{AppLang} from "../../context/lang";
import UserContext from "../../context/user";
import UsersApi from '../../api/users';
import {Button, Container, Table} from "react-bootstrap";
import {data} from "../../locals/translate/data";
import {translate} from "../../locals/translate/translate";
import {tableHeader} from "./tools";


class UserPanel extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            apartments:''
        }
    }
    componentDidMount() {
        const {match:{params}} = this.props;
        const id = params.id;
        UsersApi.validateUser(id).then(res =>{
            if (!res) {
                const {history} = this.props;
                history.push('/sign-in');
            }else {
                UsersApi.userApartments(id).then(res => {
                    this.setState({
                        apartments:res
                    })
                });
            }
        });
    }


    goApartment = (e) => {
        const id = e.target.name;
        const {history} = this.props;
        history.push(`/apartments/${id}`);
    };
    render() {
        const {apartments} = this.state;
        return (
            <LangContext.Consumer>
                {
                    ({language}) => {
                        const currentLang = AppLang[language];
                        const style = {direction: currentLang.dir};
                        const curData = data[language];
                        return (
                            <UserContext.Consumer>
                                {
                                    ({user,logOut}) => {
                                        const userLogOut = ()=> {
                                            UsersApi.userLogOut().then(res => {
                                                if (res) {
                                                    logOut();
                                                    const {history} = this.props;
                                                    history.push('/sign-in')
                                                }
                                            })
                                        };
                                        return (
                                            <div style={style}>
                                                <Container className={'mt-2'}>
                                                    <div className={'d-flex justify-content-between'}>
                                                        <div>{curData.hello+ ' ' + translate(user.name,language)}</div>
                                                        <div><Button variant={'danger'} onClick={userLogOut}>{curData.logOut}</Button></div>
                                                    </div>
                                                    <div  className={'mt-5'}>
                                                        {
                                                            apartments &&
                                                            <Table className={'text-center'}>
                                                                <thead>
                                                                <tr>
                                                                    {tableHeader.map((th,i) =>{
                                                                        return <th key={i}>{curData[th]}</th>
                                                                    })}
                                                                </tr>
                                                                </thead>
                                                                <tbody>
                                                                {Object.keys(apartments).map((key,i) => {
                                                                    return <tr key={i}>
                                                                        <td>{apartments[key].city[language]}</td>
                                                                        <td>{translate(apartments[key].address,language)}</td>
                                                                        <td>{new Date(apartments[key].created_on).toLocaleDateString()}</td>
                                                                        <td>{curData[apartments[key].sale_status]}</td>
                                                                        <td>{curData[apartments[key].status]}</td>
                                                                        <td>
                                                                            <Button name={apartments[key].id} onClick={this.goApartment} variant={'link'}>{curData.view}</Button>
                                                                        </td>

                                                                    </tr>
                                                                })}
                                                                </tbody>
                                                            </Table>
                                                        }
                                                    </div>
                                                </Container>
                                            </div>
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

export default withRouter(UserPanel);