import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
import _ from "lodash";
import classNames from "classnames";
import queryString from 'query-string';
import PropTypes from "prop-types";

import { useTranslation } from 'react-i18next';
import EmptyData from 'components/empty-data';

const Pagination = ({ count, fetch, data, processing, children, location, filter }) => {
    const [total, setTotal] = useState(0);
    const { t } = useTranslation();
    const [currentPage, setCurrentPage] = useState(_.clamp(Number(queryString.parse(location.search).page) || 1, 1, 9999999999999))

    let str;

    useEffect(() => {
        onQueryFetch();
        onSetPage();
    }, [currentPage, filter]);

    useEffect(() => {
        str = queryString.stringify(filter);
        if (data) {
            if (Array.isArray(data)) {
                setTotal(data.length);
            } else {
                setTotal(data.count);
                if (filter.offset > data.count) {
                    setCurrentPage(1);
                }
            }
        }

    }, [data]);

    function onQueryFetch() {
        const offset = currentPage >= 1 ? count * (currentPage - 1) : 0;
        if (fetch) {
            filter.offset = offset;
            fetch(filter);
        }
    };

    function onSetPage() {
        if (filter) {
            str = queryString.stringify(filter);
            history.pushState("dasd", "", `?page=${currentPage}&${str}`);
        } else {
            history.pushState("", "", `?page=${currentPage}`);
        }
    };

    function paginationNumber() {
        var numbers = [];

        const start = currentPage - 3;
        const end = currentPage + 3;
        const totalAll = Math.ceil(total / count);
        // middle
        for (var i = start; i <= end; i++) {
            if (i > 0 && i < totalAll - 1) {
                const params = { val: i };

                if (i == start || i == end) {
                    params.type = "dot";
                } else {
                    params.type = "num";
                }
                numbers.push(params);
            }
        }

        // first
        if (currentPage >= 1 && totalAll > 1)
            numbers.unshift({ val: 0, type: "num" });
        // last
        if (totalAll > 1)
            numbers.push({ val: totalAll - 1, type: "num" });

        return numbers;
    }

    if (Math.ceil(total / count) < currentPage && Math.ceil(total / count) > 0)
        setCurrentPage(1);

    if (processing) {
        return (<div className="spinner"></div>);
    }

    if (!data || data.length == 0) {
        return <React.Fragment><EmptyData /></React.Fragment>
    }

    return (
        <React.Fragment>
            {
                Array.isArray(data) ? children(_.slice(data, (currentPage - 1) * count, (currentPage) * count)) : children

            }

            <div className="pagination">
                {
                    currentPage > 1 && (
                        <button className="pagination_button_arrow pagination__visable" onClick={() => setCurrentPage(currentPage - 1)}>{"<"}</button>
                    )
                }

                {paginationNumber().map((el, i) => {
                    const isActive = classNames({
                        'pagination_button': true,
                        'pagination_is_active': el.val == currentPage - 1,
                        'pagination__visable': el.val === 0 || el.val == Math.ceil(total / count) - 1 || el.val == currentPage - 1,
                    });

                    return (
                        <button
                            key={i}
                            className={isActive}
                            onClick={() => setCurrentPage(el.val + 1)}
                        >{el.type == "dot" ? "..." : el.val + 1}</button>
                    );
                })}

                {
                    currentPage < Math.ceil(total / count) && (
                        <button className="pagination_button_arrow pagination__visable" onClick={() => setCurrentPage(currentPage + 1)}>></button>
                    )
                }
            </div>
        </React.Fragment>
    );
}

Pagination.propTypes = {
    processing: PropTypes.bool,
    count: PropTypes.number,
    fetch: PropTypes.func,
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default withRouter(Pagination);