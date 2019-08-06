import React, { useState, useEffect, Fragment } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import queryString from "query-string";

import api from "services/api";
import Pagination from "lib/Pagination";
import TransactionInfo from "./explorer-tr";
import Copy from "lib/copy";

const ExplorerInfo = props => {
  const { t } = useTranslation();

  const { hash, height } = props.match.params;
  const [isLoading, setIsLoading] = useState(false);
  const [explorerInfo, setExplorerInfo] = useState(null);
  const count = 15;
  const currentPage = _.clamp(
    Number(queryString.parse(location.search).page) || 1,
    1,
    9999999999999
  );

  useEffect(() => {
    fetch();
  }, [hash, height]);

  async function fetch() {
    setIsLoading(true);
    let params = {};

    if (hash) {
      params.hash = hash;
    }

    if (height) {
      params.height = Number(height);
    }

    try {
      const res = await api.explorer.get({ ...params });
      setExplorerInfo(res);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <div className="spinner" />;
  }

  if (!explorerInfo) {
    return <h1>Data is empty</h1>;
  }
  let title = (
    <h1>
      {t("ei-block")} №{explorerInfo.height}
    </h1>
  );

  return (
    <>
      {title}
      <div className="row">
        <div className="col-lg-12 col-sm-24 col-xs-24 summary">
          <div className="explorer__info__list">
            <div className="explorer__info__list__item">
              <div className="explorer__info__list__item__param">
                <small className="title">{t("ei-fdata")}</small>
              </div>
            </div>
            <div className="explorer__info__list__item">
              <div className="explorer__info__list__item__param">
                <small>{t("ei-atrans")}</small>
              </div>
              <div className="explorer__info__list__item__param">
                <span>{explorerInfo.transaction_count}</span>
              </div>
            </div>
            <div className="explorer__info__list__item">
              <div className="explorer__info__list__item__param">
                <small>{t("ei-toutput")}</small>
              </div>
              <div className="explorer__info__list__item__param">
                <span>{explorerInfo.out_count}</span>
              </div>
            </div>
            <div className="explorer__info__list__item">
              <div className="explorer__info__list__item__param">
                <small>{t("ei-reward")}</small>
              </div>
              <div className="explorer__info__list__item__param">
                <span>{explorerInfo.reward}</span>
              </div>
            </div>
            <div className="explorer__info__list__item">
              <div className="explorer__info__list__item__param">
                <small>{t("ei-height")}</small>
              </div>
              <div className="explorer__info__list__item__param">
                <span>{explorerInfo.height}</span>
              </div>
            </div>
            <div className="explorer__info__list__item">
              <div className="explorer__info__list__item__param">
                <small>{t("ei-ttime")}</small>
              </div>
              <div className="explorer__info__list__item__param">
                <span>
                  {moment(explorerInfo.time * 1000).format(
                    "DD.MM.YYYY, H:mm:ss"
                  )}
                  <br />
                  {`${moment(explorerInfo.time * 1000).fromNow()}`}
                </span>
              </div>
            </div>
            <div className="explorer__info__list__item">
              <div className="explorer__info__list__item__param">
                <small>{t("ei-compl")}</small>
              </div>
              <div className="explorer__info__list__item__param">
                <span>{explorerInfo.difficulty}</span>
              </div>
            </div>
            <div className="explorer__info__list__item">
              <div className="explorer__info__list__item__param">
                <small>{t("ei-bit")}</small>
              </div>
              <div className="explorer__info__list__item__param">
                <span>{explorerInfo.bits}</span>
              </div>
            </div>
            <div className="explorer__info__list__item">
              <div className="explorer__info__list__item__param">
                <small>{t("ei-size")}</small>
              </div>
              <div className="explorer__info__list__item__param">
                <span>{explorerInfo.size}</span>
              </div>
            </div>
            <div className="explorer__info__list__item">
              <div className="explorer__info__list__item__param">
                <small>{t("ei-confirm")}</small>
              </div>
              <div className="explorer__info__list__item__param">
                <span>{explorerInfo.confirmations}</span>
              </div>
            </div>
            <div className="explorer__info__list__item">
              <div className="explorer__info__list__item__param">
                <small>{t("ei-stripped_size")}</small>
              </div>
              <div className="explorer__info__list__item__param">
                <span>{explorerInfo.stripped_size}</span>
              </div>
            </div>
            <div className="explorer__info__list__item">
              <div className="explorer__info__list__item__param">
                <small>{t("ei-weight")}</small>
              </div>
              <div className="explorer__info__list__item__param">
                <span>{explorerInfo.weight}</span>
              </div>
            </div>
            <div className="explorer__info__list__item">
              <div className="explorer__info__list__item__param">
                <small>{t("ei-ver")}</small>
              </div>
              <div className="explorer__info__list__item__param">
                <span>{explorerInfo.version}</span>
              </div>
            </div>
            <div className="explorer__info__list__item">
              <div className="explorer__info__list__item__param">
                <small>{t("ei-hver")}</small>
              </div>
              <div className="explorer__info__list__item__param">
                <span>{explorerInfo.version_hex}</span>
              </div>
            </div>
            <div className="explorer__info__list__item">
              <div className="explorer__info__list__item__param">
                <small>{t("ei-nonce")}</small>
              </div>
              <div className="explorer__info__list__item__param">
                <span className="hash">{explorerInfo.nonce}</span>
              </div>
            </div>
            <div className="explorer__info__list__item">
              <div className="explorer__info__list__item__param">
                <small>{t("ei-status")}</small>
              </div>
              <div className="explorer__info__list__item__param">
                <span>{explorerInfo.status}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12 col-sm-24 col-xs-24 summary">
          <div className="explorer__info__list">
            <div className="explorer__info__list__item">
              <div className="explorer__info__list__item__param">
                <small className="title">{t("ei-hashes")}</small>
              </div>
            </div>
            <div className="explorer__info__list__item">
              <div className="explorer__info__list__item__param">
                <small>{t("ei-hash")}</small>
              </div>
              <div className="explorer__info__list__item__param">
                <span className="hash">{explorerInfo.hash}</span>
              </div>
            </div>
            <div className="explorer__info__list__item">
              <div className="explorer__info__list__item__param">
                <small>{t("ei-pblock")}</small>
              </div>
              <div className="explorer__info__list__item__param">
                <span className="hash">
                  <Link
                    to={`/explorer/block_hash/${
                      explorerInfo.previous_block_hash
                    }`}
                  >
                    {explorerInfo.previous_block_hash}
                  </Link>
                </span>
              </div>
            </div>
            <div className="explorer__info__list__item">
              <div className="explorer__info__list__item__param">
                <small>{t("ei-cwork")}</small>
              </div>
              <div className="explorer__info__list__item__param">
                <span className="hash">{explorerInfo.chain_work}</span>
              </div>
            </div>
            <div className="explorer__info__list__item">
              <div className="explorer__info__list__item__param">
                <small>{t("ei-merkle")}</small>
              </div>
              <div className="explorer__info__list__item__param">
                <span className="hash">{explorerInfo.merkle_root}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* col-sm-6 */}
      <h2>{t("ei-ltrans")}:</h2>
      <Pagination data={explorerInfo.transactions} count={count}>
        {arr => (
          <>
            {arr.map((el, i) => {
              // let info = fetchInfo(el);
              // console.warn(info);
              return (
                <div className="panel paden-default b-transaction" key={i}>
                  <div className="panel-heading">
                    <Copy copy={el} />
                    <Link to={`/explorer/block_transaction/${el}`}>{el}</Link>
                  </div>
                  {/* <TransactionInfo hash={el} /> */}
                </div>
              );
            })}
          </>
        )}
      </Pagination>
    </>
  );
};

export default ExplorerInfo;
