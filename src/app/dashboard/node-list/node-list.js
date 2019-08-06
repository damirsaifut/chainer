import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

import AppendNodeModal from "app/template/modals/append-node-modal";
import EditNodeModal from "app/template/modals/edit-node-modal";
import api from "services/api";

const NodeList = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [node, setNode] = useState([]);
  const [nodeId, setNodeId] = useState(null);

  useEffect(() => {
    fetch();
  }, []);

  async function fetch() {
    setIsLoading(true);

    try {
      const res = await api.node.list();
      setNode(res);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteNode(id) {
    setIsLoading(true);

    try {
      if (confirm(t("dnode"))) {
        const res = await api.node.delete({ id });
        fetch();
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <div className="spinner" />;
  }

  if (!node) {
    return <AppendNodeModal evFetch={fetch} />;
  }

  return (
    <>
      <AppendNodeModal evFetch={fetch} />
      {/* <table className="column-table">
                <thead>
                    <tr>
                        <th className="id">{t('n-id')}</th>
                        <th>c</th>
                        <th>{t('n-name')}</th>
                        <th>{t('n-point')}</th>
                        <th>{t('n-balance')}</th>
                        <th>{t('n-address')}</th>
                        <th>{t('n-sync')}</th>
                        <th>{t('n-trans')}</th>
                        <th>{t('n-active')}</th>
                        <th>{t('n-cold')}</th>
                        <th>{t('n-login')}</th>
                        <th>{t('n-port')}</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody> */}
      <div className="node__list">
        {node &&
          node.map(el => {
            const nodeList = classNames({
              node__list__item: true
            });
            const nodeListIsOnline = classNames({
              node_list_is_online_true: true,
              node_list_is_online_false: !el.is_online
            });
            return (
              <div className={nodeList} key={el.id}>
                <div className="node__list__item__param">
                  <button
                    className="node__list__item__param__button"
                    onClick={() => deleteNode(el.id)}
                  >
                    {/* <div
                                    dangerouslySetInnerHTML={{ __html: require('assets/img/recycle-bin.svg') }}
                                    alt="Удалить ноду"></div> */}
                    <small>{t("delete")}</small>
                  </button>
                  <EditNodeModal nodeId={el.id} fetch={fetch} />
                  <div className="status">
                    <small>
                      {t("et-status")}
                      <span className={nodeListIsOnline}>
                        {el.is_online ? " online" : " offline"}
                      </span>{" "}
                    </small>
                  </div>
                </div>
                <div className="node__list__item__param">
                  <small>{t("n-id")}</small>
                  <h4>{el.id}</h4>
                </div>
                <div className="node__list__item__param">
                  <small>{t("n-host")}</small>
                  <h4>{el.host}</h4>
                </div>
                <div className="node__list__item__param">
                  <small>{t("n-name")}</small>
                  <h4>{el.name}</h4>
                </div>
                <div className="node__list__item__param">
                  <small>{t("n-point")}</small>
                  <h4>{el.endpoint}</h4>
                </div>
                <div className="node__list__item__param">
                  <small>{t("n-balance")}</small>
                  <h4>{el.balance ? el.balance : 0}</h4>
                </div>
                <div className="node__list__item__param">
                  <small>{t("n-login")}</small>
                  <h4>{el.login ? el.login : "—"}</h4>
                </div>
                <div className="node__list__item__param">
                  <small>{t("n-port")}</small>
                  <h4>{el.port}</h4>
                </div>
                <div className="node__list__item__param">
                  <button
                    className="node__list__item__param__button"
                    onClick={() => setNodeId(nodeId !== el.id ? el.id : null)}
                  >
                    {nodeId !== el.id ? (
                      <small className="private">Показать права доступа</small>
                    ) : (
                      <small>Скрыть права доступа</small>
                    )}
                  </button>
                </div>
                {el.id == nodeId ? (
                  <div className="node__list__item__param">
                    <div className="node__list__item__param__value">
                      <small>{t("n-address")}</small>
                      <h4>
                        <input
                          type="checkbox"
                          checked={el.can_address}
                          readOnly
                        />
                      </h4>
                    </div>
                    <div className="node__list__item__param__value">
                      <small>{t("n-sync")}</small>
                      <h4>
                        <input type="checkbox" checked={el.can_sync} readOnly />
                      </h4>
                    </div>
                    <div className="node__list__item__param__value">
                      <small>{t("n-trans")}</small>
                      <h4>
                        <input
                          type="checkbox"
                          checked={el.can_transfer}
                          readOnly
                        />
                      </h4>
                    </div>
                    <div className="node__list__item__param__value">
                      <small>{t("n-active")}</small>
                      <h4>
                        <input
                          type="checkbox"
                          checked={el.is_active}
                          readOnly
                        />
                      </h4>
                    </div>
                    <div className="node__list__item__param__value">
                      <small>{t("n-cold")}</small>
                      <h4>
                        <input type="checkbox" checked={el.is_cold} readOnly />
                      </h4>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
      </div>
      {/* </tbody> */}
      {/* </table> */}
    </>
  );
};
export default NodeList;
