import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom';

class TransferListInfo extends Component {

    obj = {
        "id": 1,
        "jsonrpc": "2.0",
        "method": "transfer.list",
        "params": {}
    };

    state = {
        header: "transfer.list",
        query: this.obj
    };

    handleTestClick = () => {
        document.querySelector('.sidebar__api').classList.add('active');
    };

    render() {

        const {header, query} = this.state;

        return (
            <Fragment>
                <div className="docs-info__header">
                    <h3>{header}</h3>
                </div>
                <div className="docs-info__description">
                    <p>Возвращает список платежей</p>
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
                                <td><span>count</span></td>
                                <td>Ограничивает количество возращаемого списка</td>
                            </tr>
                            <tr>
                                <td><span>offset</span></td>
                                <td>Позволяет пропустить
                                    указанное количество строк
                                    перед тем как вернуть список адресов.</td>
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
                                    Подтверждения
                                </td>
                            </tr>
                            <tr>
                                <td><span>from_hash</span></td>
                                <td>
                                    Откуда хэш
                                </td>
                            </tr>
                            <tr>
                                <td><span>id</span></td>
                                <td>
                                    Идентификатор
                                </td>
                            </tr>
                            <tr>
                                <td><span>is_notified</span></td>
                                <td>
                                    Уведомление отправлено
                                </td>
                            </tr>
                            <tr>
                                <td><span>order_id</span></td>
                                <td>
                                    Номер заказа
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
                                    Куда хэш
                                </td>
                            </tr>
                            <tr>
                                <td><span>tx_hash</span></td>
                                <td>
                                    Транзакция
                                </td>
                            </tr>
                            <tr>
                                <td><span>tx_spent_hash</span></td>
                                <td>
                                    Транзакция расхода
                                </td>
                            </tr>
                            <tr>
                                <td><span>type</span></td>
                                <td>
                                    Тип
                                </td>
                            </tr>
                            <tr>
                                <td><span>vout</span></td>
                                <td>
                                    Номер выхода транзакции/транзакции расхода
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
    "addresses": [
        {
            "control": "external",
            "hash": "2MsULBjsH2sRGDsyBUV5p3YxcfRSYtgsDZx",
            "id": 84240,
            "node_id": 0,
            "type": "p2sh-segwit"
        },
        {
            "control": "external",
            "hash": "2NEaq6CqLZf8VzvSMNFJMNkC4jLwEEe7obM",
            "id": 83937,
            "node_id": 0,
            "type": "p2sh-segwit"
        }
    ],
    "count": 187
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

export default TransferListInfo;