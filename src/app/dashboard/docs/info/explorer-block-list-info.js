import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class ExplorerBlockListInfo extends Component {

    obj = { "id": 1,
            "jsonrpc": "2.0",
            "method": "explorer.block.list",
            "params": {} 
    };

    state = {
        header: "explorer.block.list",
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
                    <p>Возвращает список хешей</p>

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
                                <td><span>hash</span></td>
                                <td>
                                    Хэш
                                </td>
                            </tr>
                            <tr>
                                <td><span>height</span></td>
                                <td>
                                    Высота
                                </td>
                            </tr>
                            <tr>
                                <td><span>status</span></td>
                                <td>
                                    Статус
                                </td>
                            </tr>
                            <tr>
                                <td><span>time</span></td>
                                <td>
                                    Время
                                </td>
                            </tr>
                            <tr>
                                <td><span>transaction_count</span></td>
                                <td>
                                    Количество транзакций
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
    "blocks": [
        {
            hash: "0000000000000005ab8a4a51c40f6a2de107a465650d464dc122ac31d0d30aab"
            height: 1457449
            status: "parsed"
            time: 1550403062
            transaction_count: 8
        },
        {
            hash: "00000000000000bb9b9e18f61b9d0347c0e1b86b75e859c0ef9f35bfb88cff4d"
            height: 1457448
            status: "parsed"
            time: 1550402097
            transaction_count: 21
        }
    ],
    count: 1122803
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

export default ExplorerBlockListInfo;