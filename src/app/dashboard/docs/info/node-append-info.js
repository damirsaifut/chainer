import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class NodeAppendInfo extends Component {

    obj = {
        "id": 1,
        "jsonrpc": "2.0",
        "method": "node.append",
        "params": {
            "can_address": true,
            "can_transfer": true,
            "can_sync": true,
            "is_active": true,
            "is_cold": true,
            "port": 1885,
            "login": "test",
            "password": "test",
            "name": "test",
            "host": "127.0.0.1",
            "endpoint": "/"
        }
    };

    state = {
        header: "node.append",
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
                    <p>Добавляет ноду</p>
                </div>
                <div className="docs-info__params-table">
                    <p>Параметры запроса:</p>
                    <table className="info">
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
                                <td><span>endpoint</span></td>
                                <td>Точка входа</td>
                            </tr>
                            <tr>
                                <td><span>host</span></td>
                                <td>Адрес сервера</td>
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
                                <td><span>password</span></td>
                                <td>Пароль для ноды</td>
                            </tr>
                            <tr>
                                <td><span>name</span></td>
                                <td>Имя ноды</td>
                            </tr>
                            <tr>
                                <td><span>port</span></td>
                                <td>Порт ноды</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="docs-info__params-table">
                    <p>Результат запроса:</p>
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
                                <td>Идентификатор ноды</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="docs-info__params-table">
                    <p>Результат запроса:</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Имя</th>
                                <th>Описание</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><span>status</span></td>
                                <td>Статус запроса</td>
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
                            <code>
                                {`{
"id": 38
}`
                                }
                            </code>
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

export default NodeAppendInfo;

