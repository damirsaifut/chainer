import React, { useState, useEffect } from "react";
import queryString from "query-string";
import classNames from "classnames";
import _ from "lodash";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import TransactionInfo from "./explorer-tr";
import Copy from "lib/copy";

import api from "services/api";

const ExplorerTransaction = props => {
  const { t } = useTranslation();
  const { hash } = props.match.params;
  const vout = _.clamp(
    Number(queryString.parse(props.location.search).vout),
    0,
    Infinity
  );
  const spent_hash = queryString.parse(props.location.search).spent_hash
    ? queryString.parse(props.location.search).spent_hash
    : false;

  const [isLoading, setIsLoading] = useState(false);
  const [explorerTransaction, setExplorerTransaction] = useState(null);

  useEffect(() => {
    fetch();
  }, [hash]);

  async function fetch() {
    setIsLoading(true);

    try {
      const res = await api.explorer.getTransaction({ hash });
      setExplorerTransaction(res);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <div className="spinner" />;
  }

  if (!explorerTransaction) {
    return <h1>Data is empty</h1>;
  }

  return (
    <React.Fragment>
      <h2 className="hash__title">
        {t("et-title")}: <span className="hash__title">{hash}</span>
      </h2>
      <div className="transaction__info__list">
        <div className="explorer__info__list__item">
          <div className="explorer__info__list__item__param">
            <small className="title">{t("et-fdata")}</small>
          </div>
        </div>
        <div className="explorer__info__list__item">
          <div className="explorer__info__list__item__param">
            <small>{t("et-ltime")}</small>
          </div>
          <div className="explorer__info__list__item__param">
            <span>{explorerTransaction.lock_time}</span>
          </div>
        </div>
        <div className="explorer__info__list__item">
          <div className="explorer__info__list__item__param">
            <small>{t("et-size")}</small>
          </div>
          <div className="explorer__info__list__item__param">
            <span>{explorerTransaction.size}</span>
          </div>
        </div>
        <div className="explorer__info__list__item">
          <div className="explorer__info__list__item__param">
            <small>{t("et-status")}</small>
          </div>
          <div className="explorer__info__list__item__param">
            <span>{explorerTransaction.status}</span>
          </div>
        </div>
        <div className="explorer__info__list__item">
          <div className="explorer__info__list__item__param">
            <small>{t("et-vsize")}</small>
          </div>
          <div className="explorer__info__list__item__param">
            <span>{explorerTransaction.v_size}</span>
          </div>
        </div>
        <div className="explorer__info__list__item">
          <div className="explorer__info__list__item__param">
            <small>{t("et-ver")}</small>
          </div>
          <div className="explorer__info__list__item__param">
            <span>{explorerTransaction.version}</span>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-24 col-xs-24">
          <div className="panel paden-default b-transaction">
            <div className="panel-heading">
              <Copy copy={explorerTransaction.hash} />
              <span className="transaction"> {explorerTransaction.hash}</span>
            </div>
            <TransactionInfo transaction={explorerTransaction} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(ExplorerTransaction);
