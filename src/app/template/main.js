import React, { useContext } from 'react';
import { Route, Switch } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import Summary from "app/dashboard/summary/summary";
import AddressList from "app/dashboard/address-list/address-list";
import PaymentList from "app/dashboard/payment-list/payment-list";
import NodeList from "app/dashboard/node-list/node-list";
import Explorer from "app/dashboard/explorer/explorer";
import Mempool from "app/dashboard/mempool-list/mempool-list";
import Control from "app/dashboard/control/control";
import searchList from "app/dashboard/search-list/search-list";
import TransferGet from "app/dashboard/payment-list/transfer-get";
import Api from "app/dashboard/api/api";
import Docs from "app/dashboard/docs/docs";

import { AnimationContext } from "context/with-animation-context";


const Main = () => {

    const { asideAnimation } = useContext(AnimationContext);

    return (
        <CSSTransition
            in={asideAnimation.translateContent}
            timeout={400}
            classNames={{
                enterActive: 'content-active-enter',
                enterDone: 'content-enter-done',
            }}
        >
            <main className="content">
                <div className="wrapper-fluid">
                    <Switch>
                        <Route path="/" exact component={Summary} />
                        <Route path="/summary" />
                        <Route path="/address" component={AddressList} />
                        <Route path="/node" component={NodeList} />
                        <Route path="/payment" component={PaymentList} />
                        <Route path="/transfer_get" component={TransferGet} />
                        <Route path="/explorer" component={Explorer} />
                        <Route path="/mempool" component={Mempool} />
                        <Route path="/control" component={Control} />
                        <Route path="/api" component={Api} />
                        <Route path="/docs" component={Docs} />
                        <Route path="/search-list" component={searchList} />
                    </Switch>
                </div>
            </main>
        </CSSTransition>
    );
}

export default Main;