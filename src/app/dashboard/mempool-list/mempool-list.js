import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import classNames from "classnames";
import { useTranslation } from 'react-i18next';
import { CSSTransition } from 'react-transition-group';

import api from 'services/api';
import Copy from "lib/copy"
import _ from "lodash";

const searchingFor = (term) => (x) => {
    const a = _.filter(x.outputs, (e) => e.addressses.toLowerCase().includes(term.toLowerCase()));

    if (a.length) {
        return x;
    }

    return x.hash.toLowerCase().includes(term.toLowerCase()) || !term;
}

const Mempool = () => {

    const { t } = useTranslation();

    const [isLoading, setIsLoading] = useState(false);
    const [mempool, setMempool] = useState([]);
    const [term, setTerm] = useState('');
    const [isActive, setIsActive] = useState(null);

    useEffect(() => {
        fetch();
        setIsActive(false);
    }, []);

    async function fetch() {
        setIsLoading(true)

        try {
            const res = await api.mempool.get();
            setMempool(res);
        } catch (error) { }
        finally {
            setIsLoading(false)
        }
    }

    if (isLoading) {
        return (<div className="spinner"></div>);
    }

    if (!mempool) {
        // return <EmptyData />
    }

    const amountAll = _.filter(mempool, searchingFor(term))
        .reduce((accumulator, item) => {
            const amountOutputs = item.outputs.reduce((acc, currentOut) => {
                if (!currentOut.amount) return accumulator;
                return acc + Number(currentOut.amount);
            }, 0)

            return accumulator + amountOutputs;
        }, 0)

    const countAddressses = _.filter(mempool, searchingFor(term))
        .reduce((accumulator, item) => {
            const amountOutputs = item.outputs.length

            return accumulator + amountOutputs;
        }, 0)


    return (
        <React.Fragment>
            <form className="mempool_form">
                <div className="mempool_form-block">
                    <input className="mempool_search" type="text" onChange={() => setTerm(event.target.value)} value={term} />
                </div>
                <div className="mempool_form-block">
                    <div className="mempool_form-block-ammount">
                        <span className="ammount_all"> {t('m-tamount')}: {parseFloat(amountAll)}</span>
                        <span className="ammount_all"> {t('m-trans')}: {`${_.filter(mempool, searchingFor(term)).length}`}</span>
                        <span className="ammount_all"> {t('m-out')}: {`${countAddressses}`}</span>
                    </div>
                </div>
            </form>
            <div className="mempool">
                <div className="mempool__header-block">
                    <h2 className="mempool__header">
                        {t('m-hash')}
                    </h2>
                </div>
                {
                    _.filter(mempool, searchingFor(term)).map((el) => {
                        const mempoolAddressTable = classNames({
                            'mempool__address-table': true,
                        });
                        return (
                            <div className="mempool_collapse" key={el.hash}>
                                <input type="radio" id={el.hash} aria-hidden="true" name="accordion" onClick={() => setIsActive(el.hash)} />

                                <label htmlFor={el.hash} aria-hidden="true" >
                                    <span>{el.hash}</span>
                                    <Copy copy={el.hash} class="mempool" />
                                    <Link to={`/explorer/block_transaction/${el.hash}`} >
                                        <div
                                            className="svg share share--mempool"
                                            dangerouslySetInnerHTML={{ __html: require('assets/img/share.svg') }}
                                            width="24"
                                            height="24"
                                        ></div>
                                    </Link>
                                </label>
                                <CSSTransition
                                    in={el.hash == isActive ? true : false}
                                    timeout={400}
                                    classNames={{
                                        enter: 'mempool__address-table-enter',
                                        enterDone: 'mempool__address-table-enter-done',
                                    }}
                                >
                                    <div className='mempool__address-table'>
                                        <div className="head">
                                            <small className="hash__title">{t('m-ahash')}</small>
                                            <small className="title">{t('m-sum')}</small>
                                        </div>

                                        {el.outputs.map((elem, index) => {
                                            let tr = (
                                                <div className="body" key={index}>
                                                    <small>{elem.addressses.length !== 0 ?
                                                        <Link
                                                            to={`/explorer/block_address_get/${elem.addressses}`}> {elem.addressses} </Link>
                                                        : "Невозможно отобразить адрес"}</small>
                                                    <small>{parseFloat(elem.amount)}</small>
                                                </div>
                                            );
                                            return (
                                                <div className="body" key={index}>
                                                    <small className="hash">{elem.addressses.length !== 0 ?
                                                        <Link
                                                            to={`/explorer/block_address_get/${elem.addressses}`}> {elem.addressses} </Link>
                                                        : t('m-unaddr')}</small>
                                                    <small>{parseFloat(elem.amount)}</small>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </CSSTransition>
                            </div>
                        );
                    })
                }
            </div>
        </React.Fragment >
    );
};

export default Mempool;