import React from "react";
import ApartmentsApi from '../../api/apartments';
export default class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
       const res =  ApartmentsApi.get('page/1');
    }

    render() {
        return (
            <div></div>
        );
    }
}