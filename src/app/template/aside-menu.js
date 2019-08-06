import React, { useContext } from 'react';
import { NavLink } from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
import { useTranslation } from 'react-i18next';

import { AnimationContext } from "context/with-animation-context";

function AsideMenu() {

    const { asideAnimation, handleCloseMenuClick } = useContext(AnimationContext);
    const { t } = useTranslation();

    return (
        <CSSTransition
            in={asideAnimation.closeMenu}
            timeout={300}
            classNames={{
                enter: 'text-enter',
                enterActive: 'text-active-enter',
                enterDone: 'text-enter-done',
                exit: 'text-exit',
                exitActive: 'text-active-exit',
                exitDone: 'text-done-exit'
            }}
        >
            <aside className="sidebar">
                <nav>
                    <NavLink to="/" exact className="sidebar__summary">
                        <div className="svg sidebar__img" dangerouslySetInnerHTML={{ __html: require('assets/img/summary.svg') }}></div>
                        <span>{t('summary')}</span>
                    </NavLink>
                    <NavLink to="/address" className="sidebar__address">
                        <div className="svg sidebar__img" dangerouslySetInnerHTML={{ __html: require('assets/img/notebook.svg') }}></div>
                        <span>{t('address')}</span>
                    </NavLink>
                    <NavLink to="/payment" className="sidebar__payment">
                        <div className="svg sidebar__img" dangerouslySetInnerHTML={{ __html: require('assets/img/transaction.svg') }}></div>
                        <span>{t('payment')}</span>
                    </NavLink>
                    <NavLink to="/node" className="sidebar__node">
                        <div className="svg sidebar__img" dangerouslySetInnerHTML={{ __html: require('assets/img/nodes.svg') }}></div>
                        <span>{t('node')}</span>
                    </NavLink>
                    <NavLink to="/explorer" className="sidebar__blockchain">
                        <div className="svg sidebar__img" dangerouslySetInnerHTML={{ __html: require('assets/img/blockchain.svg') }}></div>
                        <span>{t('explorer')}</span>
                    </NavLink>
                    <NavLink to="/mempool" className="sidebar__mempool">
                        <div className="svg sidebar__img" dangerouslySetInnerHTML={{ __html: require('assets/img/mempool.svg') }}></div>
                        <span>{t('mempool')}</span>
                    </NavLink>
                    <NavLink to="/control" className="sidebar__control">
                        <div className="svg sidebar__img" dangerouslySetInnerHTML={{ __html: require('assets/img/admin_with_cogwheels.svg') }}></div>
                        <span>{t('control')}</span>
                    </NavLink>
                    <NavLink to="/api" className="sidebar__api">
                        <div className="svg sidebar__img" dangerouslySetInnerHTML={{ __html: require('assets/img/api-page.svg') }}></div>
                        <span>{t('api')}</span>
                    </NavLink>
                    <NavLink to="/docs" className="sidebar__docs">
                        <div className="svg sidebar__img" dangerouslySetInnerHTML={{ __html: require('assets/img/docs.svg') }}></div>
                        <span>{t('docs')}</span>
                    </NavLink>

                    <CSSTransition
                        in={asideAnimation.rotateBtn}
                        timeout={300}
                        classNames={{
                            enterActive: 'left-active',
                            enterDone: 'left',
                            exitActive: 'right-active',
                            exitDone: 'right'
                        }}
                    >
                        <button
                            className="aside__button"
                            type="button"
                            onClick={handleCloseMenuClick}
                        >
                            <div className="svg sidebar__img" dangerouslySetInnerHTML={{ __html: require('assets/img/circle-with-an-arrow-pointing-to-left.svg') }}></div>
                        </button>
                    </CSSTransition>
                </nav>
            </aside>
        </CSSTransition>
    );
};


export default AsideMenu;