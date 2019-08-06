import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class TransferGetInfo extends Component {

    obj = {
        "id": 1,
        "jsonrpc": "2.0",
        "method": "transfer.get",
        "params": {
            "id": 1
        }
    };

    state = {
        header: "transfer.get",
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
                    <p>Возвращает параметры платежа по идентификатору</p>
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
                                <td><span>id</span></td>
                                <td>Идентификатор ноды</td>
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
                                <td><span>amount</span></td>
                                <td>
                                    Сумма 
                                </td>
                            </tr>
                            <tr>
                                <td><span>confirmations</span></td>
                                <td>

                                </td>
                            </tr>
                            <tr>
                                <td><span>from_hash</span></td>
                                <td>

                                </td>
                            </tr>
                            <tr>
                                <td><span>from_id</span></td>
                                <td>

                                </td>
                            </tr>
                            <tr>
                                <td><span>id</span></td>
                                <td>

                                </td>
                            </tr>
                            <tr>
                                <td><span>is_notified</span></td>
                                <td>

                                </td>
                            </tr>
                            <tr>
                                <td><span>order_id</span></td>
                                <td>

                                </td>
                            </tr>
                            <tr>
                                <td><span>post_stamp</span></td>
                                <td>
                                    Время создания
                                </td>
                            </tr>
                            <tr>
                                <td><span>status</span></td>
                                <td>
                                    Статус
                                </td>
                            </tr>
                            <tr>
                                <td><span>to_hash</span></td>
                                <td>

                                </td>
                            </tr>
                            <tr>
                                <td><span>to_id</span></td>
                                <td>

                                </td>
                            </tr>
                            <tr>
                                <td><span>tx_hash</span></td>
                                <td>

                                </td>
                            </tr>
                            <tr>
                                <td><span>tx_spent_hash</span></td>
                                <td>

                                </td>
                            </tr>
                            <tr>
                                <td><span>type</span></td>
                                <td>

                                </td>
                            </tr>
                            <tr>
                                <td><span>vout</span></td>
                                <td>

                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="docs-info__example-block">
                    <p>Exapmles</p>
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
    "amount": 0.01,
    "confirmations": 2525,
    "from_hash": "",
    "from_id": 0,
    "id": 1,
    "is_notified": true,
    "order_id": "",
    "post_stamp": 1549028536,
    "status": "complete",
    "to_hash": "mzb7yQP9FW9ohw1GAHN1LbqVrqFthtiSwQ",
    "to_id": 6,
    "tx_hash": "5b9507e171a0ad2be1bacde1cfde9bee7765b3b4554b5acf36098bf863ba56e1",
    "tx_spent_hash": "",
    "type": "incoming",
    "vout": 0
}`}</code>
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

export default TransferGetInfo;
