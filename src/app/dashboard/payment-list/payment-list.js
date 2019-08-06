import React, { Fragment, useState } from 'react';
import moment from 'moment';
import { Link } from "react-router-dom";
import queryString from 'query-string';
import { useTranslation } from 'react-i18next';

import CreateTransferModal from "app/template/modals/create-transfer-modal";
import api from 'services/api';
import Pagination from "lib/Pagination";
import FilterPayment from "lib/Filter-payment";
import NodeSendRawTransaction from "../../template/modals/node-sendrawtransaction-modal";
import Copy from "lib/copy"

const PaymentList = (props) => {
    const { t } = useTranslation();
    const { start_stamp, end_stamp, address, status, type, offset } = queryString.parse(props.location.search);
    const [isLoading, setIsLoading] = useState(false);
    const [transfer, setTransfer] = useState(null);
    const [filter, setFilter] = useState({
        start_stamp: !start_stamp ? 1199127600 : Number(start_stamp),
        end_stamp: !end_stamp ? +new Date(moment().format('YYYY-MM-DD')) / 1000 + 86400 : Number(end_stamp),
        address: address,
        status: status,
        type: type,
        count: 10,
        offset: Number(offset)
    });
    const [date, setDate] = useState({
        start_stamp: !start_stamp ? 1199127600 : Number(start_stamp),
        end_stamp: !end_stamp ? +new Date(moment().format('YYYY-MM-DD')) / 1000 : Number(end_stamp)
    });

    function onFilter(event, name) {
        let value = event.target.value;
        setFilter(filter => ({ ...filter, [name]: value }))
    }

    const dateTime = (date) => {
        const stillUtc = +new Date(moment(date)) / 1000;
        return stillUtc;
    };

    function onDate(event, name) {
        let value = event.target.value;
        value = dateTime(value);
        if (!value && name == "start_stamp") {
            value = 1199127600
        }
        if (!value && name == "end_stamp") {
            value = +new Date(moment().format('YYYY-MM-DD')) / 1000;
        }
        setDate(date => ({ ...date, [name]: value }))
    }

    function onFilterDate() {
        setFilter(filter => ({ ...filter, start_stamp: date.start_stamp, end_stamp: date.end_stamp + 86400 }));
    }

    async function fetch() {
        setIsLoading(true)

        try {
            const res = await api.transfer.list(filter);
            setTransfer(res);
        } catch (error) { }
        finally {
            setIsLoading(false)
        }
    }

    return (

        <Fragment>
            <Pagination
                processing={isLoading}
                fetch={fetch}
                data={transfer}
                count={10}
                filter={filter}
            >
                <CreateTransferModal fetch={fetch} />
                <NodeSendRawTransaction fetch={fetch} />
                <FilterPayment filter={filter} onFilter={onFilter} onFilterDate={onFilterDate} onDate={onDate} date={date} />
                <div className="payment__list">
                    {
                        transfer && transfer.transfers.map((el) => {
                            let toOrFrom = (
                                <React.Fragment>
                                    <small>to Hash <Copy copy={el.to_hash} /></small><h4><Link className="hash" to={`/explorer/block_address_get/${el.to_hash}`}>{el.to_hash}</Link></h4>
                                </React.Fragment>
                            );
                            let orderId = null;
                            if (el.order_id) {
                                orderId = (<div>
                                    <small>order_id:</small> {el.order_id}
                                </div>
                                );
                            }
                            return (
                                <div className="payment__list__item" key={el.id}>
                                    <div className="payment__list__item__head">
                                        <div>
                                            <small>{t('p-id')} {" "}
                                                <Link to={`/transfer_get?id=${el.id}`}>{el.id}</Link>
                                            </small></div>
                                        <small>{t('p-cdate')}: {moment(el.post_stamp * 1000).format('DD.MM.YYYY, H:mm:ss')}</small>
                                    </div>
                                    {/* <div className="payment__list__item__param"><small>ID</small><h4><Link to={`/transfer_get?id=${el.id}`}>{el.id}</Link></h4></div> */}
                                    <div className="payment__list__item__param"><small>{t('p-status')}</small><h4>{`${el.status}`}({el.confirmations})</h4></div>
                                    <div className="payment__list__item__param">
                                        {toOrFrom}
                                        {el.tx_hash ? <><small>tx Hash <Copy copy={el.tx_hash} /></small><h4><Link className="hash" to={`/explorer/block_transaction/${el.tx_hash}?vout=${el.vout}`}>{el.tx_hash}</Link></h4> </> : null}
                                        {orderId}
                                    </div>
                                    <div className="payment__list__item__param"><small>{t('p-sum')}</small><h4>{el.amount}</h4></div>
                                    <div className="payment__list__item__param"><small>{t('p-type')}</small><h4>{el.type}</h4></div>
                                    <div className="payment__list__item__param"><small>	{t('p-notific')}</small><h4><input type="checkbox" checked={el.is_notified} readOnly /></h4></div>
                                </div>
                            );
                        })
                    }
                </div>
            </Pagination>
        </Fragment >

    );
};

export default PaymentList;