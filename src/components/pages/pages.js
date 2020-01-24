import React from "react";
import {Pagination} from "react-bootstrap";
import {withRouter} from 'react-router-dom';


class Pages extends React.Component{
    render() {
        const {search} = this.props.location;
        const {count,active} = this.props;
            const items = [];
            for (let number = 1; number <= count; number++) {
                items.push(
                    <Pagination.Item key={number} active={number === active} href={`/apartments/page/${number+search}`}>
                        {number}
                    </Pagination.Item>,
                );
            }

        return (
            <Pagination>{items}</Pagination>
        );
    }
}

export default withRouter(Pages);


