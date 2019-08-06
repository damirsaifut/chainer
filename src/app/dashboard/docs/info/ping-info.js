import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

class PingInfo extends Component {
  obj = {
    id: 1,
    jsonrpc: "2.0",
    method: "ping",
    params: {}
  };

  state = {
    header: "ping",
    query: this.obj
  };

  handleTestClick = () => {
    document.querySelector(".sidebar__api").classList.add("active");
  };
  render() {
    const { header, query } = this.state;

    return (
      <Fragment>
        <div className="docs-info__header">
          <h3>{header}</h3>
        </div>
        <div className="docs-info__description">
          <p>Показывает доступность сервера</p>
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
                <td>
                  <span>id</span>
                </td>
                <td>Идентификатор запроса</td>
              </tr>
              <tr>
                <td>
                  <span>method</span>
                </td>
                <td>Строка, содержащая имя вызываемого метода.</td>
              </tr>
              <tr>
                <td>
                  <span>jsonrpc</span>
                </td>
                <td>
                  Строка, указывающая версию протокола JSON-RPC. ДОЛЖЕН быть
                  "2.0".
                </td>
              </tr>
              <tr>
                <td>
                  <span>params:</span>
                </td>
                <td>
                  Структурированное значение, которое содержит значения
                  параметров, которые будут использоваться во время вызова
                  метода.
                </td>
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
                <td>
                  <span>pong</span>
                </td>
                <td>Доступность сервера</td>
              </tr>
              <tr>
                <td>
                  <span>version</span>
                </td>
                <td>Версия</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="docs-info__example-block">
          <p>Пример запроса:</p>
          <div>
            <pre>
              <code
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify(query, null, "  ")
                }}
              />
            </pre>
          </div>
        </div>
        <div className="docs-info__example-block">
          <p>Пример результата запроса:</p>
          <div>
            <pre>
              <code>{`{
    "pong": true, 
    "version": 1.0.0.0
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
            onClick={this.handleTestClick}
          >
            Test
          </Link>
        </div>
      </Fragment>
    );
  }
}

export default PingInfo;
