import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class NotificationUrl extends Component {

    obj = {
        "id": 1,
        "jsonrpc": "2.0",
        "method": "ping",
        "params": {}
    };

    state = {
        header: "notification_url",
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
                    <p>Данный параметр в управление отвечает за протокол уведомления. </p>
                </div>
                <div className="docs-info__params-table">
                    <p>Параметры настройки:</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Наименование</th>
                                <th>Значение</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><span>notification_url</span></td>
                                <td>url</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="docs-info__example-block">
                    <p>Пример уведомления:</p>
                    <div>
                        <pre>
                            <code>{`{
    "id":12345, //внутренний ID
    "order_id":"23ee9d6b-f75b-44af-bc86-3cda0e0d528f", //номер платежа, переданный внешней площадкой

    "type":"incoming", //тип: incoming, outgoing
    "status":"confirmation", //статусы: new, sent, mempool, confirmation, complete, invalid
    "confirmations":1, //количество подтверждений //TODO: dont forget about transactions with block_id == 0
    "timestamp":1516785464, //время транзакции

    "platform":"btc", //платформа чейнера
    "currency":"btc", //валюта: коин, токен
    "address":"2N7SY15LhvkfuFPxaeLyzhMga2LfVFm8Jd1", //выход транзакции
    "amount":0.1234567, //сумма

    "block_hash":"00000000000000efc31e099eb44f62416c1852be7c1d6db1cf59496d1e192f36", //хэш блока
    "tx_hash":"09826d97ed04939439a78efeec9bb5c7a96ec5f8c187ae2c2bcdd23274130d8b", //хэш транзакции
    "tx_spent_hash":"4eaac96d56716167a5c3bc7fffd3606113a0cba0727fbf92d0df0fa963bc8cbe", //хэш транзакции 
    источника
    "vout":1 //номер выхода
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

export default NotificationUrl;