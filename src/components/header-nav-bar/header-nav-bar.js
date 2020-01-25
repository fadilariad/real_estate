import React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import {withRouter} from 'react-router-dom';
import LangContext,{AppLang} from "../../context/lang";
import {headerData} from "./links";
import {data} from "../../locals/translate/data";
import ChangeLang from "./changeLang";
import {HouseFill} from 'react-bootstrap-icons';
class HeaderNavBar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <LangContext.Consumer>
                {
                    ({language}) => {
                        const currentLang = AppLang[language];
                        const {location} = this.props;
                        const style = {direction:currentLang.dir};
                        const curData = data[language];
                        return(
                            <header style={style} id='header'>
                                <Navbar expand="lg" className='border-bottom pb-0'>
                                    <Container>
                                        <Navbar.Brand href="/"><HouseFill color={'red'} size={'2em'}/></Navbar.Brand>
                                        <Navbar.Toggle aria-controls="header-nav-bar"/>
                                        <Navbar.Collapse id="header-nav-bar">
                                            <Nav className='align-items-stretch w-100'  activeKey={location.pathname}>
                                                {headerData.map((link,i) => {
                                                    return <Nav.Link  href={link.href} key={i}>{curData[link.label]}</Nav.Link>
                                                })}
                                            </Nav>
                                            <ChangeLang/>
                                        </Navbar.Collapse>
                                    </Container>
                                </Navbar>
                            </header>
                        );

                    }
                }
            </LangContext.Consumer>

        );
    }
}

export default withRouter(HeaderNavBar);




