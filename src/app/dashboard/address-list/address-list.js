import React, { Fragment, useState } from 'react';
import queryString from 'query-string';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import FilterAddress from "lib/Filter-address"
import CreateAddressModal from 'app/template/modals/create-address-modal';
import AppendAddressModal from 'app/template/modals/append-address-modal';
import AddressGetModal from 'app/template/modals/address-get-modal'
import api from 'services/api';
import Pagination from "lib/Pagination";
import Copy from "lib/copy"


const AddressList = (props) => {

    const { t } = useTranslation();
    const { node_id, control, type, count, offset } = queryString.parse(props.location.search);
    const [isLoading, setIsLoading] = useState(false);
    const [addresses, setAddress] = useState(null);
    const [filter, setFilter] = useState({
        node_id: !node_id ? 0 : Number(node_id),
        control: control,
        type: type,
        count: 10,
    });

    async function fetch() {
        setIsLoading(true)

        try {
            const res = await api.address.list(filter);
            setAddress(res);
        } catch (error) { }
        finally {
            setIsLoading(false)
        }
    }

    function onFilter(event, name) {
        let value = event.target.value;
        if (name == "node_id")
            value = Number(value);

        setFilter(filter => ({ ...filter, [name]: value }));
    };

    return (
        <Fragment>
            <Pagination
                processing={isLoading}
                fetch={fetch}
                data={addresses}
                count={filter.count}
                filter={filter}
            >
                <CreateAddressModal fetch={fetch} />
                <AppendAddressModal fetch={fetch} />
                <FilterAddress filter={filter} onFilter={onFilter} />
                <div className="address__list">
                    {
                        addresses && addresses.addresses.map((el) => {
                            return (
                                <div className="address__list__item" key={el.id}>
                                    <div className="address__list__item__param"><small>{t('a-id')}</small><h4>{el.id}</h4></div>
                                    <div className="address__list__item__param"><small>{t('a-control')}</small><h4>{el.control}</h4></div>
                                    <div className="address__list__item__param"><small>{t('a-hash')}<Copy copy={el.hash} /></small><h4><Link to={`/explorer/block_address_get/${el.hash}`}> {el.hash}</Link></h4></div>
                                    <div className="address__list__item__param"><small>{t('a-node')}</small><h4>{el.node_id == 0 ? "—" : el.node_id}</h4></div>
                                    <div className="address__list__item__param"><small>{t('a-type')}</small><h4>{el.type}</h4></div>
                                    <div className="address__list__item__param"><AddressGetModal hash={el.hash} /></div>
                                </div>
                            );
                        })
                    }
                </div>
            </Pagination>
        </Fragment >
    );
};

export default AddressList;