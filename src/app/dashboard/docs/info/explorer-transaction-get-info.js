import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class ExplorerTransitionGetInfo extends Component {

    obj = {
        "id": 1,
        "jsonrpc": "2.0",
        "method": "explorer.transaction.get",
        "params": {
            "hash": "535c7a876acbcbc9ffbe163ab668cef8428f5a69273f46079e0c4076e2585c74"
        }
    };

    state = {
        header: "explorer.transaction.get",
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
                    <p>Возвращает выбранную транзакцию</p>
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
                                <td>hash транзакции</td>
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
                                <td><span>block_height</span></td>
                                <td>
                                    Высота блока
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
                                    Идентификатор
                                </td>   
                            </tr>
                            <tr>
                                <td><span>inputs</span></td>
                                <td>
                                    Входы
                                </td>
                            </tr>
                            <tr>
                                <td><span>lock_time</span></td>
                                <td>
                                    Время блокировки
                                </td>
                            </tr>
                            <tr>
                                <td><span>outputs</span></td>
                                <td>
                                    Выходы
                                </td>
                            </tr>
                            <tr>
                                <td><span>size</span></td>
                                <td>
                                    Размеры
                                </td>   
                            </tr>
                            <tr>
                                <td><span>status</span></td>
                                <td>
                                    Статус
                                </td>
                            </tr>
                            <tr>
                                <td><span>v_size</span></td>
                                <td>
                                    Размер
                                </td>
                            </tr>
                            <tr>
                                <td><span>version</span></td>
                                <td>
                                    Версия
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
    "block_height": 1457449,
    "hash": "535c7a876acbcbc9ffbe163ab668cef8428f5a69273f46079e0c4076e2585c74",
    "id": 13749357,
    "inputs": [
        {
            "addresses": "n1gWy2YyDxejgy2gXppwEgh3Mwt3wXaXXV",
            "amount": 0.01,
            "tx_id": "692d5061e5e2fdafa2d6de6f11f9f26e6b89b8ab79c566d027812959fc0e7504",
            "vout": 0
        },
        {
            "addresses": "mgZbATWeRpU3Q7To6jTXSXqTdrh2VtMD7b",
            "amount": 0.01,
            "tx_id": "cf76d2130b3d758818655bd2e3971e032e66c6cadd66351c8ed9e6a03e23e90a",
            "vout": 1
        }
    ],
    "lock_time": 0,
    "outputs": [
        {
            "addresses": "mwSPJA8vQ8RseDiNEBxXtykQeCGD5ynDMM",
            "n": 0,
            "value": 0.01
        },
        {
            "addresses": "n4CVCCNTuQHPPGyh2igEDJwMmCGHk35eKb",
            "n": 1,
            "value": 0.009248
        }
    ],
    "size": 373,
    "status": "parsed",
    "v_size": 373,
    "version": 1
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

export default ExplorerTransitionGetInfo;