import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class SummaryInfo extends Component {

    obj = {
        "id": 1,
        "jsonrpc": "2.0",
        "method": "summary.info",
        "params": {}
    };

    state = {
        header: "summary.info",
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
                    <p>Возвращает сводку</p>
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
                                <td><span>blockchain</span></td>
                                <td>
                                    Блокчейн
                                </td>
                            </tr>
                            <tr>
                                <td><span>block_best_blockchain</span></td>
                                <td>
                                    Лучший блок блокчейна
                                </td>
                            </tr>
                            <tr>
                                <td><span>block_best_database</span></td>
                                <td>
                                    Лучшая база данных
                                </td>
                            </tr>
                            <tr>
                                <td><span>block_count_database</span></td>
                                <td>
                                    База данных счетчиков блоков
                                </td>
                            </tr>
                            <tr>
                                <td><span>block_gap_database</span></td>
                                <td>
                                    База данных с пропусками
                                </td>
                            </tr>
                            <tr>
                                <td><span>block_not_sync</span></td>
                                <td>
                                    Блок не синхронизирован
                                </td>
                            </tr>
                            <tr>
                                <td><span>block_synced</span></td>
                                <td>
                                    Блок синхронизирован
                                </td>
                            </tr>
                            <tr>
                                <td><span>nodes</span></td>
                                <td>
                                    Ноды
                                </td>
                            </tr>
                            <tr>
                                <td><span>balance</span></td>
                                <td>
                                    Баланс
                                </td>
                            </tr>
                            <tr>
                                <td><span>best_block_hash</span></td>
                                <td>
                                    Лучший блок хэш
                                </td>
                            </tr>
                            <tr>
                                <td><span>blocks</span></td>
                                <td>
                                    Блоки
                                </td>
                            </tr>
                            <tr>
                                <td><span>chain</span></td>
                                <td>
                                    chain
                                </td>
                            </tr>
                            <tr>
                                <td><span>headers</span></td>
                                <td>
                                    Заголовки
                                </td>
                            </tr>
                            <tr>
                                <td><span>id</span></td>
                                <td>
                                    Идентификатор
                                </td>
                            </tr>
                            <tr>
                                <td><span>is_online</span></td>
                                <td>
                                    В сети
                                </td>
                            </tr>
                            <tr>
                                <td><span>name</span></td>
                                <td>
                                    Имя
                                </td>
                            </tr>
                            <tr>
                                <td><span>url</span></td>
                                <td>
                                    Url адрес
                                </td>
                            </tr>
                            <tr>
                                <td><span>pending_transfer_count</span></td>
                                <td>
                                    Количество ожидающих переводов
                                </td>
                            </tr>
                            <tr>
                                <td><span>task_transaction_update_count</span></td>
                                <td>
                                    Количество обновлений транзакции задачи
                                </td>
                            </tr>
                            <tr>
                                <td><span>task_transfer_notification_count</span></td>
                                <td>
                                    Количество уведомлений о передаче задачи
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
    "blockchain": {
        "block_best_blockchain": 1474161,
        "block_best_database": 1474161,
        "block_count_database": 1474162,
        "block_gap_database": 0,
        "block_not_sync": 0,
        "block_synced": [
            [
                0,
                1474161
            ]
        ]
    },
    "nodes": [
        {
            "balance": 0.01199744,
            "best_block_hash": "00000000000060e53fc078614609b031861021a80d32dba4cbe62322484d3484",
            "blocks": 1474161,
            "chain": "test",
            "headers": 1474161,
            "id": 1,
            "is_online": true,
            "name": "Super node",
            "url": "bitcoinrpc:********@127.0.0.1:18332/"
        }
    ],
    "pending_transfer_count": 13,
    "task_transaction_update_count": 2,
    "task_transfer_notification_count": 3
} `}</code>
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

export default SummaryInfo;