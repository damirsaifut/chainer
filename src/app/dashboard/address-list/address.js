import React from 'react';
import { Switch, Route } from "react-router-dom";

import AddressList from "./address-list";


const Address = () => {
    return (
        <Switch>
            <Route path="/address" exact component={AddressList} />
        </Switch>
    );
};

export default Address;