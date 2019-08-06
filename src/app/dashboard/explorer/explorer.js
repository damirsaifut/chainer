import React from "react";
import { Switch, Route } from "react-router-dom";

import ExplorerList from "./explorer-list";
import ExplorerInfo from "./explorer-info";
import ExplorerTransaction from "./explorer-transaction";
import ExplorerAddressGet from "./explorer-address-get";
import Search from 'app/template/search';

const Explorer = () => {
    return (
        <React.Fragment>
            <Search />
            <Switch>
                <Route path="/explorer" exact component={ExplorerList} />
                <Route path="/explorer/block_hash/:hash" component={ExplorerInfo} />
                <Route path="/explorer/block_height/:height" component={ExplorerInfo} />
                <Route path="/explorer/block_transaction/:hash" component={ExplorerTransaction} />
                <Route path="/explorer/block_address_get/:hash" component={ExplorerAddressGet} />
            </Switch>
        </React.Fragment>
    );
};

export default Explorer;