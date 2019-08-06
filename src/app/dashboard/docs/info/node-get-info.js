import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class NodeGetInfo extends Component {

    obj = {
        "id": 1,
        "jsonrpc": "2.0",
        "method": "node.get",
        "params": {
            "id": 1
        }
    };

    state = {
        header: "node.get",
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
                    <p>Возвращает параметры ноды согласно идентификатору.</p>
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
                                <td><span>balance</span></td>
                                <td>Баланс ноды</td>
                            </tr>
                            <tr>
                                <td><span>best_block_hash</span></td>
                                <td>Последний хэш блока этой ноды</td>
                            </tr>
                            <tr>
                                <td><span>blocks</span></td>
                                <td>Высота блока</td>
                            </tr>
                            <tr>
                                <td><span>can_address</span></td>
                                <td>Параметр отвечающий за создание и добавление адресов в ноду: true или false
                                     </td>
                            </tr>
                            <tr>
                                <td><span>can_sync</span></td>
                                <td>Параметр отвечающий за синхронизацию ноды: true или false</td>
                            </tr>
                            <tr>
                                <td><span>can_transfer</span></td>
                                <td>Параметр отвечающий за создание платежей: true или false</td>
                            </tr>
                            <tr>
                                <td><span>chain</span></td>
                                <td>Сеть</td>
                            </tr>
                            <tr>
                                <td><span>endpoint</span></td>
                                <td>Точка входа</td>
                            </tr>
                            <tr>
                                <td><span>headers</span></td>
                                <td>Количество заголовков</td>
                            </tr>
                            <tr>
                                <td><span>host</span></td>
                                <td>Адрес сервера</td>
                            </tr>
                            <tr>
                                <td><span>id</span></td>
                                <td>Идентификатор ноды</td>
                            </tr>
                            <tr>
                                <td><span>is_active</span></td>
                                <td>Параметр отвечающий активна ли нода: true или false</td>
                            </tr>
                            <tr>
                                <td><span>is_cold</span></td>
                                <td>Параметр, который показывает является ли нода холодной : true или false</td>
                            </tr>
                            <tr>
                                <td><span>is_online</span></td>
                                <td>Приобретенный параметр, который отвечает за доступность ноды</td>
                            </tr>
                            <tr>
                                <td><span>login</span></td>
                                <td>Логин для ноды</td>
                            </tr>
                            <tr>
                                <td><span>name</span></td>
                                <td>Имя ноды</td>
                            </tr>
                            <tr>
                                <td><span>port</span></td>
                                <td>Порт ноды</td>
                            </tr>
                            <tr>
                                <td><span>tx_fee</span></td>
                                <td>Комиссия за транзакцию</td>
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
                            <code>{`[
    {
        "balance": 1.85999981,
        "best_block_hash": "00000000000c5764b156982131dc69e6cf51ac7190b8a677944017e790ed2251",
        "blocks": 1457210,
        "can_address": true,
        "can_sync": true,
        "can_transfer": true,
        "chain": "test",
        "endpoint": "/",
        "headers": 1457210,
        "host": "136.243.21.232",
        "id": 1,
        "is_active": true,
        "is_cold": false,
        "is_online": true,
        "login": "rpc_bitcoin",
        "name": "Super node",
        "port": 18332,
        "tx_fee": 0
    }
]`}</code>
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

export default NodeGetInfo;