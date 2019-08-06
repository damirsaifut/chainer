import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class ExplorerAddressGetInfo extends Component {

    obj = {
        "id": 1,
        "jsonrpc": "2.0",
        "method": "explorer.address.get",
        "params": {
            "hash": "n3AcJy4p39yM8PiPR2vB8tuBzZE1N5kb48"
        }
    };

    state = {
        header: "explorer.address.get",
        query: this.obj
    };

    handleTestClick = () => {
        document.querySelector('.sidebar__api').classList.add('active');
    };

    render() {

        const { header, query } = this.state;

        return (
            <Fragment>
                <div className="docs-info__header">
                    <h3>{header}</h3>
                </div>
                <div className="docs-info__description">
                    <p>Возвращает адрес транзакции</p>
                </div>
                <div className="docs-info__params-table">
                    <p>Параметры запроса:</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Имя</th>
                                <th>Описание</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><span>id</span></td>
                                <td>Идентификатор запроса</td>
                            </tr>
                            <tr>
                                <td><span>method</span></td>
                                <td>Строка, содержащая имя вызываемого метода.</td>
                            </tr>
                            <tr>
                                <td><span>jsonrpc</span></td>
                                <td>Строка, указывающая версию протокола JSON-RPC. ДОЛЖЕН быть "2.0".</td>
                            </tr>
                            <tr>
                                <td><span>params:</span></td>
                                <td>Структурированное значение,
                                    которое содержит значения параметров,
                                    которые будут использоваться во время вызова метода.</td>
                            </tr>
                            <tr>
                                <td><span>hash</span></td>
                                <td>hash адреса транзакции</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="docs-info__params-table">
                    <p>Результат запроса:</p>
                    <table className="info">
                        <thead>
                            <tr>
                                <th>Имя</th>
                                <th>Описание</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><span>control</span></td>
                                <td>
                                    Контроль
                                </td>
                            </tr>
                            <tr>
                                <td><span>hash</span></td>
                                <td>
                                    Хэш
                                </td>
                            </tr>
                            <tr>
                                <td><span>id</span></td>
                                <td>
                                    Идентификатор адреса
                                </td>
                            </tr>
                            <tr>
                                <td><span>node_id</span></td>
                                <td>
                                    Идентификатор ноды
                                </td>
                            </tr>
                            <tr>
                                <td><span>type</span></td>
                                <td>
                                    Тип
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="docs-info__example-block">
                    <p>Пример запроса:</p>
                    <div>
                        <pre>
                            <code dangerouslySetInnerHTML={{ __html: JSON.stringify(query, null, '  ') }}></code>
                        </pre>
                    </div>
                </div>
                <div className="docs-info__example-block">
                    <p>Пример результата запроса:</p>
                    <div>
                        <pre>
                            <code>{`{
    "address": {
        "control": "owned",
        "hash": "n3AcJy4p39yM8PiPR2vB8tuBzZE1N5kb48",
        "id": 5740966,
        "node_id": 1,
        "type": "p2pkh"
    },
    "balance": "0"
}
    `}</code>
                        </pre>
                    </div>
                </div>
                <div className="docs-info__btn-block">
                    <Link
                        to={{
                            pathname: "/api",
                            search: "",
                            hash: "",
                            state: { header, query }
                        }}
                        className="docs-info__btn"
                        onClick={this.handleTestClick}>
                        Test
                    </Link>
                </div>
            </ Fragment>
        );
    }
};

export default ExplorerAddressGetInfo;