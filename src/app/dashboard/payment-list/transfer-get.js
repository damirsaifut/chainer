import React, { useState, useEffect, Fragment } from 'react';
import { withRouter } from "react-router-dom";
import queryString from 'query-string';
import _ from "lodash";
import { Link } from "react-router-dom";
import moment from 'moment';
import { useTranslation } from 'react-i18next';

import api from 'services/api';
import EmptyData from 'components/empty-data';


const TransferGet = (props) => {
    const { t } = useTranslation();
    const transferId = _.clamp(Number(queryString.parse(props.location.search).id), 0, Infinity);
    const [isLoading, setIsLoading] = useState(false);
    const [transfer, setTransfer] = useState([]);

    useEffect(() => {
        evFetchData();
    }, [])

    async function evFetchData() {
        setIsLoading(true);

        try {
            const res = await api.transfer.get({ id: transferId });
            setTransfer(res);

        } catch (error) { }
        finally {
            setIsLoading(false);

        }
    };

    if (isLoading) {
        return (<div className="spinner"></div>);
    }

    if (!transfer) {
        return (<EmptyData />);
    }


    let transferGet = Object.keys(transfer);

    return (
        <Fragment>
            <h2>{t('tg-payid')} {transferId}</h2>
            <div className="transfer__get__list">
                <div className="transfer__get__list__item">
                    <div className="transfer__get__list__item__param"><small className="title">{t('ei-fdata')}</small></div>
                </div>
                <div className="transfer__get__list__item">
                    <div className="transfer__get__list__item__param"><small>{t('p-sum')}</small></div>
                    <div className="transfer__get__list__item__param"><span>{transfer[transferGet[0]]}</span></div>
                </div>
                {/* <div className="transfer__get__list__item">
                    <div className="transfer__get__list__item__param"><small>{t('p-id')}</small></div>
                    <div className="transfer__get__list__item__param"><span>{transfer[transferGet[3]]}</span></div>
                </div> */}
                <div className="transfer__get__list__item">
                    <div className="transfer__get__list__item__param"><small>{t('p-confirmations')}</small></div>
                    <div className="transfer__get__list__item__param"><span>{transfer[transferGet[1]]}</span></div>
                </div>
                <div className="transfer__get__list__item">
                    <div className="transfer__get__list__item__param"><small>{t('p-notific')}</small></div>
                    <div className="transfer__get__list__item__param"><span>{`${transfer[transferGet[4]]}`}</span></div>
                </div>
                {transfer[transferGet[5]] ? (<div className="transfer__get__list__item">
                    <div className="transfer__get__list__item__param"><small>{t('p-order-id')}</small></div>
                    <div className="transfer__get__list__item__param"><span>{`${transfer[transferGet[5]]}`}</span></div>
                </div>) : null}
                <div className="transfer__get__list__item">
                    <div className="transfer__get__list__item__param"><small>{t('p-cdate')}</small></div>
                    <div className="transfer__get__list__item__param"><span>{moment(transfer[transferGet[6]] * 1000).format('DD.MM.YYYY, H:mm:ss')}</span></div>
                </div>
                <div className="transfer__get__list__item">
                    <div className="transfer__get__list__item__param"><small>{t('et-status')}</small></div>
                    <div className="transfer__get__list__item__param"><span>{transfer[transferGet[7]]}</span></div>
                </div>
                <div className="transfer__get__list__item">
                    <div className="transfer__get__list__item__param"><small>To hash</small></div>
                    <div className="transfer__get__list__item__param"><span className="hash"><Link to={`/explorer/block_address_get/${transfer[transferGet[8]]}`}>{transfer[transferGet[8]]}</Link></span></div>
                </div>
                <div className="transfer__get__list__item">
                    <div className="transfer__get__list__item__param"><small>Tx hash</small></div>
                    <div className="transfer__get__list__item__param"><span className="hash"><Link to={`/explorer/block_transaction/${transfer[transferGet[9]]}?vout=${transfer[transferGet[12]]}`}>{transfer[transferGet[9]]}</Link></span></div>
                </div>
                <div className="transfer__get__list__item">
                    <div className="transfer__get__list__item__param"><small>{t('p-type')}</small></div>
                    <div className="transfer__get__list__item__param"><span>{transfer[transferGet[11]]}</span></div>
                </div>
            </div>
        </Fragment >
    )
}

export default withRouter(TransferGet);