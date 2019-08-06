import React, { Fragment, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import moment from 'moment';
import { useTranslation } from 'react-i18next';

import api from 'services/api';
import Pagination from 'lib/Pagination';
import Copy from "lib/copy"


const ExplorerList = (props) => {

    const { t } = useTranslation();


    const [isLoading, setIsLoading] = useState(false);
    const [explorerList, setExplorerList] = useState(null);
    const [filter, setFilter] = useState({
        count: 15,
    });

    async function fetch() {
        setIsLoading(true);

        try {
            const res = await api.explorer.list(filter);
            setExplorerList(res);
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
                data={explorerList}
                count={10}
                filter={filter}
            >
                {/* <div className="column-table__wrapper">
                    <table className="column-table">
                        <thead>
                            <tr>
                                <th className="hash hidden-xs hidden-sm">{t('e-hash')}</th>
                                <th>{t('e-block')}</th>
                                <th>{t('e-status')}</th>
                                <th>{t('e-time')}</th>
                                <th>{t('e-atrans')}</th>
                            </tr>
                        </thead>
                        <tbody> */}
                <div className="explorer__list">

                    {
                        explorerList && explorerList.blocks.map((el) => {
                            return (
                                <div className="explorer__list__item" key={el.hash}>
                                    <div className="explorer__list__item__param"><small>{t('e-hash')}</small><Copy copy={el.hash} />
                                        <h4><Link to={`/explorer/block_hash/${el.hash}`} >{el.hash}</Link></h4>
                                    </div>
                                    <div className="explorer__list__item__param"><small>{t('e-block')}</small>
                                        <h4><Link to={`/explorer/block_height/${el.height}`} >{el.height}</Link></h4>
                                    </div>
                                    <div className="explorer__list__item__param">
                                        <small>{t('e-status')}</small><h4>{el.status}</h4></div>
                                    <div className="explorer__list__item__param">
                                        <small>{t('e-time')}</small><h4>{moment(el.time * 1000).format('DD.MM.YYYY, H:mm:ss')}</h4>
                                        {`${moment(el.time * 1000).fromNow()}`}
                                    </div>
                                    <div className="explorer__list__item__param">
                                        <small>{t('e-atrans')}</small><h4>{el.transaction_count}</h4></div>
                                </div>
                            );
                        })
                    }
                </div>
                {/* </tbody>
                    </table>
                </div> */}
            </Pagination>
        </Fragment>
    );
};

export default ExplorerList;