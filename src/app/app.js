import React, { Fragment, useEffect } from 'react';
import { BrowserRouter } from "react-router-dom";

import 'services/i18n';
import Header from './template/header';
import AsideMenu from './template/aside-menu';
import Main from './template/main';
import { AnimationProvider } from "context/with-animation-context";

import "assets/styles/index.less";

const App = () => {

    return (
        <BrowserRouter>
            <AnimationProvider>
                <Fragment>
                    <Header />
                    <div className="main-block">
                        <AsideMenu />
                        <Main />
                    </div>
                </Fragment>
            </AnimationProvider>
        </BrowserRouter>
    );
};

export default App;
