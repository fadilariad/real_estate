import React from "react";

const UserContext = React.createContext('guest');

export const AppUser = {
    guest:'guest',
    agent:'agent',
    admin:'admin'
};

export default UserContext;