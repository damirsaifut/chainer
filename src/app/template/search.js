import React, { useState, Fragment } from 'react';
import { withRouter } from "react-router-dom";


const Search = (props) => {
    const [search, setSearch] = useState('');

    function forSearch(event) {
        let value = event.target.value;
        setSearch(value)

    }

    function onSearch() {
        const location = {
            pathname: '/search-list',
            search: `?search=${search}`
        }

        props.history.push(location);
    }
    function keyPress() {
        if (event.keyCode == 13) {
            const location = {
                pathname: '/search-list',
                search: `?search=${search}`
            }

            props.history.push(location);
        }
    }

    return (
        <React.Fragment>
            <div className="search">
                <input type="text" onChange={() => forSearch(event)} value={search}
                    onKeyDown={(event) => keyPress(event)} />
                <button
                    className="main_button"
                    onClick={() => onSearch()}
                > Поиск</button>
            </div>
        </React.Fragment>
    )

};

export default withRouter(Search);