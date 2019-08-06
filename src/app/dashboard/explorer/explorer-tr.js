import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";

import api from "services/api";
import Copy from "lib/copy";

const TransactionInfo = props => {
  const [isLoading, setIsLoading] = useState(false);
  const transaction = props.transaction;
  const [info, setInfo] = useState(transaction);
  const [visible, setVisible] = useState(false);

  function declination(number, titles) {
    let cases = [2, 0, 1, 1, 1, 2];

    return (
      number +
      " " +
      titles[
        number % 100 > 4 && number % 100 < 20
          ? 2
          : cases[number % 10 < 5 ? number % 10 : 5]
      ]
    );
  }

  if (info) {
    var countInputs = info.inputs.length;
    var countOutputs = info.outputs.length;
    var countInputsAddressses = info.inputs.reduce((accumulator, item) => {
      if (item.addresses !== "") return (accumulator = accumulator + 1);
      return accumulator;
    }, 0);
    var countOutputsAddressses = info.outputs.reduce((accumulator, item) => {
      if (item.addresses !== "") return (accumulator = accumulator + 1);
      return accumulator;
    }, 0);
    var inputsValue = info.inputs.reduce((accumulator, item) => {
      if (item.addresses !== "") return (accumulator = accumulator + 1);
      return accumulator;
    }, 0);

    countInputsAddressses =
      countInputsAddressses !== 0
        ? "c " +
          declination(countInputsAddressses, [
            "адресом",
            "адресами",
            " адресами"
          ])
        : "без адресов";
    countOutputsAddressses =
      countOutputsAddressses !== 0
        ? "c " +
          declination(countOutputsAddressses, [
            "адресом",
            "адресами",
            " адресами"
          ])
        : "без адресов";
    countInputs = declination(countInputs, ["вход", "входа", "входов"]);
    countOutputs = declination(countOutputs, ["выход", "выхода", "выходов"]);
  }

  return (
    <Fragment>
      <div className="panel-body">
        <button
          className="transaction__button"
          onClick={() => setVisible(!visible)}
        >
          <span>
            {countInputs} {countInputsAddressses} на {countOutputs}{" "}
            {countOutputsAddressses}
          </span>
        </button>
        {visible ? (
          <Fragment>
            <div className="row transaction__info">
              <div className="col-md-10 col-sm-24 col-xs-24">
                <ul>
                  {info.inputs.map(el => {
                    return (
                      <li key={Math.random()}>
                        <Copy copy={el} />
                        {el.addresses.length !== 0 ? (
                          <Link
                            title={el.addresses}
                            className="hash"
                            to={`/explorer/block_address_get/${el.addresses}`}
                          >
                            {" "}
                            {el.addresses}{" "}
                          </Link>
                        ) : (
                          "Невозможно отобразить адрес"
                        )}
                        {"  "}
                        <Link
                          to={`/explorer/block_transaction/${el.tx_id}?vout=${
                            el.vout
                          }`}
                        >
                          Output
                        </Link>
                        &rarr;<span>{el.amount}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="col-sm-1 arrow">
                <div
                  className="svg sidebar__img"
                  dangerouslySetInnerHTML={{
                    __html: require("assets/img/right-arrow.svg")
                  }}
                />
              </div>
              <div className="col-md-12 col-sm-24 col-xs-24">
                <ul>
                  {info.outputs.map((el, i) => {
                    return (
                      <li key={Math.random()}>
                        <Copy copy={el} />
                        {el.addresses.length !== 0 ? (
                          <Link
                            title={el.addresses}
                            className="hash"
                            to={`/explorer/block_address_get/${el.addresses}`}
                          >
                            {" "}
                            {el.addresses}{" "}
                          </Link>
                        ) : (
                          "Невозможно отобразить адрес"
                        )}
                        {"  "}

                        <span>{el.value}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </Fragment>
        ) : null}
      </div>
    </Fragment>
  );
};

export default TransactionInfo;
