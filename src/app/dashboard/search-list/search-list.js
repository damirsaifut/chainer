import React, { useState, Fragment, useRef, useEffect } from 'react';
import { Link, Redirect } from "react-router-dom"
import queryString from 'query-string';

import api from 'services/api';
import Pagination from 'lib/Pagination';
import Search from '../../template/search'

const searchList = (props) => {
    const count = 150;
    const { search } = queryString.parse(props.location.search);
    const [isLoading, setIsLoading] = useState(false);
    const [searchList, setSearchList] = useState([]);
    const [filter, setFilter] = useState({ str: search, max_count: count })

    useEffect(() => {
        if(search) {
        if (search.length >= 1) {
            evFetchData();
        }
    }
    }, [props])


    async function evFetchData() {
        setIsLoading(true);
        try {
            const res = await api.explorer.search(filter);
            setSearchList(res);
        } catch (error) { console.warn(error); }
        finally {

            setIsLoading(false);
        }
    }

    function valueByType(el) {
        switch (el.type) {
            case "block":
                return <Link to={`/explorer/block_hash/${el.hash}`}>{el.hash}</Link>
            case "transaction":
                return <Link to={`/explorer/block_transaction/${el.hash}`}>{el.hash}</Link>
            default:
                return <Link to={`/explorer/block_address_get/${el.hash}`}>{el.hash}</Link>;
        }
    }

    function valueRedirectByType(el) {
        switch (el.type) {
            case "block":
                return <Redirect to={`/explorer/block_hash/${el.hash}`}>{el.hash}</Redirect>
            case "transaction":
                return <Redirect to={`/explorer/block_transaction/${el.hash}`}>{el.hash}</Redirect>
            default:
                return <Redirect to={`/explorer/block_address_get/${el.hash}`}>{el.hash}</Redirect>;
        }
    }

    if (isLoading) {
        return (<div className="spinner"></div>);
    }

    if (!searchList) {
        return <h1>Data is empty</h1>
    }

    if (searchList.length == 1) {
        // console.warn(searchList[0]);
        return valueRedirectByType(searchList[0]);

    }

    return (
        <React.Fragment>
            <Search />
            <Pagination data={searchList} count={15} filter={filter} >
                {(arr) => (
                    <table className="column-table">
                        <thead>
                            <tr>
                                <th>Hash</th>
                                <th>Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                arr.map((el, i) => {
                                    return (
                                        <tr key={el.hash}>
                                            <td>{valueByType(el)}</td>
                                            <td>{el.type}</td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                )}
            </Pagination>
        </React.Fragment>
    )

}

export default searchList;