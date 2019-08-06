import React, { useState, useEffect } from 'react';
import _ from "lodash"
import { Link } from "react-router-dom";
import moment from 'moment';
import classNames from "classnames";
import { useTranslation } from 'react-i18next';

import Pagination from "lib/Pagination";
import api from 'services/api';

const ExplorerAddressGet = (props) => {
    const { t } = useTranslation();
    const { hash } = props.match.params;
    const [isLoading, setIsLoading] = useState(false);
    const [addressGet, setAddressGet] = useState(null);

    useEffect(() => {
        fetch();
    }, [hash])

    async function fetch() {
        setIsLoading(true)

        try {
            const res = await api.explorer.addressGet({ hash });
            setAddressGet(res);
        } catch (error) { }
        finally {
            setIsLoading(false)
        }
    }

    if (isLoading) {
        return (<div className="spinner"></div>);
    }

    if (!addressGet) {
        return <h1>Data is empty</h1>
    }


    return (
        <React.Fragment>
            <h1>Address_get</h1>
            <div className="address__get__list">
                <div className="address__get__list__item">
                    <div className="address__get__list__item__param"><small className="title">{t('eag-fdata')}</small></div>
                </div>
                <div className="address__get__list__item">
                    <div className="address__get__list__item__param"><small>{t('eag-id')}</small></div>
                    <div className="address__get__list__item__param"><span>{addressGet.address.id}</span></div>
                </div>
                <div className="address__get__list__item">
                    <div className="address__get__list__item__param"><small>{t('eag-hash')}</small></div>
                    <div className="address__get__list__item__param"><span className="hash">{addressGet.address.hash}</span></div>
                </div>
                <div className="address__get__list__item">
                    <div className="address__get__list__item__param"><small>{t('eag-acontrol')}</small></div>
                    <div className="address__get__list__item__param"><span>{addressGet.address.control}</span></div>
                </div>
                <div className="address__get__list__item">
                    <div className="address__get__list__item__param"><small>{t('eag-bal')}</small></div>
                    <div className="address__get__list__item__param"><span>{addressGet.balance}</span></div>
                </div>
                <div className="address__get__list__item">
                    <div className="address__get__list__item__param"><small>{t('eag-nid')}</small></div>
                    <div className="address__get__list__item__param"><span>{addressGet.address.node_id}</span></div>
                </div>
                <div className="address__get__list__item">
                    <div className="address__get__list__item__param"><small>{t('eag-atype')}</small></div>
                    <div className="address__get__list__item__param"><span>{addressGet.address.type}</span></div>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-24 col-xs-24">
                    <h2>{t('eag-lout')}:</h2>

                    <Pagination data={addressGet.outputs} count={30} >
                        {(arr) => {
                            const objectValues = _.groupBy(arr, "hash");

                            return Object.keys(objectValues).map((hash, i) => {
                                const currently = objectValues[hash];

                                const time = _.unionBy(currently, "time")[0].time;
                                const address_outputs = classNames({
                                    'left col-sm-12': currently.length >= 1 && currently.every(out => Number(out.value) > 0),
                                    'address_outputs': true,
                                    'right col-sm-12': currently.every(out => Number(out.value) < 0),
                                });

                                const mas = currently.map((el, i) => {
                                    const address_outputs_value_red = classNames({
                                        'green': true,
                                        'address_outputs_value_red': el.value < 0,
                                    });

                                    return (
                                        <Link className={address_outputs_value_red}
                                            to={`/explorer/block_transaction/${el.hash}?vout=${el.vout}&spent_hash=${el.spent_hash}`}
                                            key={i}>{`${parseFloat(el.value)}`}</Link>
                                    )
                                });
                                return (
                                    <div className={address_outputs} key={i}>
                                        <div className="outputs">
                                            <Link className="hash" to={`/explorer/block_transaction/${hash}`} ><h4>{hash}</h4></Link>
                                            {moment(time * 1000).format('DD.MM.YYYY, H:mm:ss')},
                                                        {` ${moment(time * 1000).fromNow()}`}</div>
                                        <div className="outputs_value">
                                            {mas}
                                        </div>

                                    </div>

                                )
                            });
                        }
                        }
                    </Pagination>
                </div>
            </div>
        </React.Fragment >

    )
};

export default ExplorerAddressGet;
