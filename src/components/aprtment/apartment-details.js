import React from "react";
import {Table} from "react-bootstrap";


function ApartmentDetailsTable  (props){
    return  <Table>
        <thead className={'text-center'}>
        <tr>
            {['Rooms','Beds','Sqft','Position'].map((data,i) => {
                return <th key={i}>{data}</th>
            })}
        </tr>
        </thead>
        <tbody className={'text-center'}>
        <tr>
            {['number_of_rooms','number_of_beds','sqft'].map((feild,i) => {
                return <td>{props.data[feild] ?props.data[feild] :'Not Aviable'}</td>
            })}
            <td>{props.data.for_sale && 'Sale'}{props.data.for_rent && ' Rent '}{!props.data.for_rent && !props.data.for_sale && 'Not Avaible'}</td>
        </tr>
        </tbody>
    </Table>
};