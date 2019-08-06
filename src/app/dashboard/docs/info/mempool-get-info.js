import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom';

class MempoolGetInfo extends Component {

    obj = {
        "id": 1,
        "jsonrpc": "2.0",
        "method": "mempool.get",
        "params": {}
    };

    state = {
        header: "mempool.get",
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
                    <p>Возвращает список транзакций с выходами</p>
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
                                <td><span>hash</span></td>
                                <td>
                                    Хэш
                                </td>
                            </tr>
                            <tr>
                                <td><span>outputs</span></td>
                                <td>
                                    Выходы
                                </td>
                            </tr>
                            <tr>
                                <td><span>addressses</span></td>
                                <td>
                                    Адреса
                                </td>
                            </tr>
                            <tr>
                                <td><span>amount</span></td>
                                <td>
                                    Сумма
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
                            <code>{`[
    {
        "hash": "5e9c1add72e0f90d4071136567ca25e42299eadb93bafca2aa03b47629f98939",
        "outputs": [
            {
                "addressses": "2NFwqxby3dudST3xW3pmAnYeyhViE9oMuCj",
                "amount": "0.0195056"
            },
            {
                "addressses": "2N4qYjye5yENLEkz4UkLFxzPaxJatF3kRwf",
                "amount": "0.01"
            }
        ]
    },
    {
        "hash": "06fafc92a83670ce459bf93daa89aa8d8ff2df7df92599478c8bb8ffdc3f0b43",
        "outputs": [
            {
                "addressses": "2NFc2UtfVMJ1t6zjyUwLaNEvhYqaCHdehqk",
                "amount": "1.2e-05"
            },
            {
                "addressses": "2MzZJaVCXxHaFNjyYmKGHS9TaZo1D3WHyLu",
                "amount": "0.00033653"
            }
        ]
    },
    {
        "hash": "1a73cb7dec5538c567c1a2fe3554b00385ea8be7db1ae4ebf7443b4541d8f84a",
        "outputs": [
            {
                "addressses": "tb1qa4deuz49z8jurk0ztksfmkmq4n5fekdx3pzr25",
                "amount": "0.0271"
            }
        ]
    },
    {
        "hash": "d44b67c27413287954b1d1f868a488bf263471b38cc9bf8596bee7f209e5b572",
        "outputs": [
            {
                "addressses": "tb1qa4deuz49z8jurk0ztksfmkmq4n5fekdx3pzr25",
                "amount": "0.0271"
            },
            {
                "addressses": "tb1qgp6u7t8l9lpj07l8kj0wxwlgn3g3jqzfwrdqzg",
                "amount": "0.0148708"
            }
        ]
    }
]
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

export default MempoolGetInfo;