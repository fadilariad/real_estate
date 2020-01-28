import React from "react";

const UserContext = React.createContext('guest');

export const AppUser = {
    name:'',
    id:'',
    type:''
};

export default UserContext;