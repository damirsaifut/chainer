import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import api from 'services/api';
import EmptyData from 'components/empty-data';

const FilterAddress = (props) => {

    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [node, setNode] = useState([]);
    const control = {
        [t('fa-fall')]: "all",
        [t('fa-fref')]: "regular",
        [t('fa-ext')]: "external",
        [t('fa-own')]: "owned",
        [t('fa-faggr')]: "aggregation"
    };
    const type = ['p2pkh', 'p2sh-segwit', 'bech32'];

    useEffect(() => {
        evFetchData();
    }, []);

    async function evFetchData() {
        setIsLoading(true);

        try {
            const res = await api.node.list();
            setNode(res);

        } catch (error) { }
        finally {

            setIsLoading(false);
        }
    };

    if (!node) {
        return alert("Нет ноды");
    }

    return (
        <div className="filter">
            <div className="row justify-left">
                <div className="col col-sm col-md">
                    <div className="text">{t('fa-facont')}</div>
                    <select className="filter-select-address" name="type" onChange={() => props.onFilter(event, "control")} value={props.filter.control}>
                        {Object.keys(control).map((el, i) => {
                            return (
                                <option value={control[el]} key={el} >{el}</option>
                            );
                        })}
                    </select>
                </div>
                <div className="col col-sm col-md">
                    <div className="text">{t('fa-fatype')}</div>
                    <select className="filter-select-address" name="type" onChange={() => props.onFilter(event, "type")} value={props.filter.type}>
                        <option value="all">{t('fa-fall')}</option>
                        {type.map((el, i) => {
                            return (
                                <option value={type[el]} key={el} >{el}</option>
                            );
                        })}
                    </select>
                </div>
                <div className="col col-sm col-md">
                    <div className="text">{t('fa-fnode')}</div>
                    <select className="filter-select-address" onChange={(event) => props.onFilter(event, "node_id")} value={props.filter.node_id}>
                        <option value="0">{t('fa-fnsel')}</option>
                        {node.map((el, i) => {
                            return (
                                <option className="select-modal__type" value={el.id} key={i} >{el.id} {el.host} {el.port}</option>
                            );
                        })}
                    </select>
                </div>
            </div>
        </div>

    )
};


export default FilterAddress;
