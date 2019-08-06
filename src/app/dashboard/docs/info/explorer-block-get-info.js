import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

class ExplorerBlockGetInfo extends Component {

    obj = {
        "id": 1,
        "jsonrpc": "2.0",
        "method": "explorer.block.get",
        "params": {
            "hash": "00000000001788720399040ed15dd83f6ec8d34e3889e8ecbc61a88264986410"
        }
    };

    state = {
        header: "explorer.block.get",
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
                    <p>Возвращает информацию о блоке транзакций</p>
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
                                <td>hash блока транзакций</td>
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
                                <td><span>bits</span></td>
                                <td>
                                    bits
                                </td>
                            </tr>
                            <tr>
                                <td><span>chain_work</span></td>
                                <td>    
                                    Работа чейнера
                                </td>
                            </tr>
                            <tr>
                                <td><span>difficulty</span></td>
                                <td>
                                    Сложность
                                </td>   
                            </tr>
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
                                <td><span>median_time</span></td>
                                <td>
                                    Среднее время 
                                </td>
                            </tr>
                            <tr>
                                <td><span>merkle_root</span></td>
                                <td>
                                    Корень Меркле
                                </td>   
                            </tr>
                            <tr>
                                <td><span>nonce</span></td>
                                <td>
                                    Nonce
                                </td>
                            </tr>
                            <tr>
                                <td><span>previous_block_hash</span></td>
                                <td>
                                    Предыдущий блок хэша
                                </td>
                            </tr>
                            <tr>
                                <td><span>size</span></td>
                                <td>
                                    Размер
                                </td>
                            </tr>
                            <tr>
                                <td><span>status</span></td>
                                <td>
                                    Статус
                                </td>
                            </tr>
                            <tr>
                                <td><span>stripped_size</span></td>
                                <td>
                                    Stripped size
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
                            <tr>
                                <td><span>transactions</span></td>
                                <td>
                                    Транзакции
                                </td>
                            </tr>
                            <tr>
                                <td><span>version</span></td>
                                <td>
                                    Версии
                                </td>
                            </tr>
                            <tr>
                                <td><span>version_hex</span></td>
                                <td>
                                    Версия hex
                                </td>
                            </tr>
                            <tr>
                                <td><span>weight</span></td>
                                <td>
                                    Ширина
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
    "bits": "1d00ffff",
    "chain_work": "0000000000000000000000000000000000000000000000f449f4d505c86a653f",
    "difficulty": 1,
    "hash": "00000000001788720399040ed15dd83f6ec8d34e3889e8ecbc61a88264986410",
    "height": 1457450,
    "median_time": 1550401139,
    "merkle_root": "73b429904fd6781182b1d4ccebbb190817d2d3dee4df916242c8ac1bb869f71f",
    "nonce": 901858893,
    "previous_block_hash": "0000000000000005ab8a4a51c40f6a2de107a465650d464dc122ac31d0d30aab",
    "size": 44581,
    "status": "parsed",
    "stripped_size": 22021,
    "time": 1550404270,
    "transaction_count": 96,
    "transactions": [
        "017c571c8624030ed9cf60630a8d9bfab535fa21650789400d91d82d81d4df40",
        "07e4e45a4e328f5ccaee14b110dd934279bc1985f6a797acc28901ebd9fcd41f",
        ...
    ],
    "version": 536870912,
    "version_hex": "20000000",
    "weight": 110644
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

export default ExplorerBlockGetInfo;