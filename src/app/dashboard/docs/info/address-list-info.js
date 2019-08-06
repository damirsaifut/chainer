import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';

class AddressListInfo extends Component {
    obj = {
        "id": 1,
        "jsonrpc": "2.0",
        "method": "address.list",
        "params": {}
    };

    state = {
        header: "address.list",
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
                    <p>Возвращает спискок адресов</p>
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
                    <table>
                        <thead>
                            <tr>
                                <th>Имя</th>
                                <th>Описание</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><span>control</span></td>
                                <td>Контроль адреса:
                                    <ul className="control">
                                        <li>regular- внешний</li>
                                        <li>external - наблюдаемый</li>
                                        <li>owned - подконтрольный</li>
                                        <li>aggregation - агрегационный</li>
                                    </ul>
                                </td>
                            </tr>
                            <tr>
                                <td><span>hash</span></td>
                                <td>Hash адреса</td>
                            </tr>
                            <tr>
                                <td><span>id</span></td>
                                <td>Идентификатор адреса</td>
                            </tr>
                            <tr>
                                <td><span>node_id</span></td>
                                <td>Идентификатор ноды</td>
                            </tr>
                            <tr>
                                <td><span>type</span></td>
                                <td>Тип адреса</td>
                            </tr>
                            <tr>
                                <td><span>count</span></td>
                                <td>Количество адресов</td>
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

export default AddressListInfo;