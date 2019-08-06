import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import api from 'services/api';
import Syncline from 'components/Syncline';
import { ls } from 'services/ls';
import EmptyData from 'components/empty-data';
import Copy from 'lib/copy';

const Summary = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState(null);

  let local;
  if (ls.summary.get()) local = ls.summary.get();

  let differenceCounter = '';
  let differenceSynchronized = '';
  let differenceTransfersCount = '';
  let differenceCountTransaction = '';
  let differenceCurrentSync = '';

  async function fetch() {
    setIsLoading(true);

    try {
      const res = await api.summary.info();
      setSummary(p => {
        if (ls.summary.get()) local = ls.summary.get();
        if (p) {
          ls.summary.set({
            pending_transfer_count: p.pending_transfer_count,
            task_transaction_update_count: p.task_transaction_update_count,
            task_transfer_notification_count:
              p.task_transfer_notification_count,
            block_gap_database: p.blockchain.block_gap_database,
            block_not_sync: p.blockchain.block_not_sync
          });
        }
        return res;
      });

      if (!ls.summary.get()) {
        if (res.blockchain)
          ls.summary.set({
            block_gap_database: res.blockchain.block_gap_database,
            block_not_sync: res.blockchain.block_not_sync,
            pending_transfer_count: res.pending_transfer_count,
            task_transaction_update_count: res.task_transaction_update_count,
            task_transfer_notification_count:
              res.task_transfer_notification_count,
            time: +new Date()
          });
      } else {
        if (new Date() - ls.summary.get().time >= 86400000) {
          ls.summary.clear();
          ls.summary.set({
            block_gap_database: res.blockchain.block_gap_database,
            block_not_sync: res.blockchain.block_not_sync,
            pending_transfer_count: res.pending_transfer_count,
            task_transaction_update_count: res.task_transaction_update_count,
            task_transfer_notification_count:
              res.task_transfer_notification_count,
            time: +new Date()
          });
        }
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const throttle = setInterval(() => {
      fetch();
    }, 15000);
    fetch();
    return () => {
      clearInterval(throttle);
    };
  }, []);

  if (isLoading) {
    return <div className="spinner" />;
  }

  if (!summary) {
    return (
      <React.Fragment>
        <EmptyData />
      </React.Fragment>
    );
  }

  if (summary)
    if (summary.blockchain && local) {
      differenceCurrentSync =
        summary.blockchain.block_gap_database - local.block_gap_database;
      differenceSynchronized =
        summary.blockchain.block_not_sync - local.block_not_sync;
      differenceTransfersCount =
        summary.pending_transfer_count - local.pending_transfer_count;
      differenceCountTransaction =
        summary.task_transaction_update_count -
        local.task_transaction_update_count;
      differenceCounter =
        summary.task_transfer_notification_count -
        local.task_transfer_notification_count;
    }

  const pendingTransferCount = classNames({
    summary__list__item: true,
    pending_green: true,
    pending_yellow: summary.pending_transfer_count >= 100,
    pending_red: summary.pending_transfer_count >= 500
  });

  const taskTransactionUpdateCount = classNames({
    summary__list__item: true,
    pending_green: true,
    pending_yellow: summary.task_transaction_update_count >= 100,
    pending_red: summary.task_transaction_update_count >= 500
  });

  const taskTransferNotificationCount = classNames({
    summary__list__item: true,
    pending_green: true,
    pending_yellow: summary.task_transfer_notification_count >= 10,
    pending_red: summary.task_transfer_notification_count >= 50
  });

  const differenceCurrentSyncClass = classNames({
    differenceMinus: differenceCurrentSync < 0,
    difference: differenceCurrentSync > 0
  });

  const differenceSynchronizedClass = classNames({
    differenceMinus: differenceSynchronized < 0,
    difference: differenceSynchronized > 0
  });

  const differenceTransfersCountClass = classNames({
    differenceMinus: differenceTransfersCount < 0,
    difference: differenceTransfersCount > 0
  });

  const differenceCountTransactionClass = classNames({
    differenceMinus: differenceCountTransaction < 0,
    difference: differenceCountTransaction > 0
  });

  const differenceCounterClass = classNames({
    differenceMinus: differenceCounter < 0,
    difference: differenceCounter > 0
  });

  return (
    <>
      <h1>{t('summary')}</h1>
      <Syncline
        max={summary.blockchain.block_best_blockchain}
        blocks={summary.blockchain.block_synced}
      />

      <div className="summary__list">
        <div className="summary__list__item">
          <div className="summary__list__item__param">
            <small className="title">{t('dsummary')}</small>
          </div>
        </div>
        <div className="summary__list__item">
          <div className="summary__list__item__param">
            <small>{t('best-blockchain')}</small>
          </div>
          <div className="summary__list__item__param">
            <span>{summary.blockchain.block_best_blockchain}</span>
          </div>
        </div>
        <div className="summary__list__item">
          <div className="summary__list__item__param">
            <small>{t('best-base')}</small>
          </div>
          <div className="summary__list__item__param">
            <span>{summary.blockchain.block_best_blockchain}</span>
          </div>
        </div>
        <div className="summary__list__item">
          <div className="summary__list__item__param">
            <small>{t('count-base')}</small>
          </div>
          <div className="summary__list__item__param">
            <span>{summary.blockchain.block_count_database}</span>
          </div>
        </div>
        <div className="summary__list__item">
          <div className="summary__list__item__param">
            <small>{t('wait-sync')}</small>
          </div>
          <div className="summary__list__item__param">
            <span>
              {summary.blockchain.block_gap_database}
              {differenceCurrentSync !== 0 ? (
                <Fragment>
                  (
                  <small
                    className={differenceCurrentSyncClass}
                  >{`${differenceCurrentSync}`}</small>
                  )
                </Fragment>
              ) : null}
            </span>
          </div>
        </div>
        <div className="summary__list__item">
          <div className="summary__list__item__param">
            <small>{t('not-sync')}</small>
          </div>
          <div className="summary__list__item__param">
            <span>
              {summary.blockchain.block_not_sync}
              {differenceSynchronized !== 0 ? (
                <Fragment>
                  (
                  <small
                    className={differenceSynchronizedClass}
                  >{`${differenceSynchronized}`}</small>
                  )
                </Fragment>
              ) : null}
            </span>
          </div>
        </div>
        <div className={pendingTransferCount}>
          <div className="summary__list__item__param">
            <small>{t('expect-trans')}</small>
          </div>
          <div className="summary__list__item__param">
            <span>
              {summary.pending_transfer_count}
              {differenceTransfersCount !== 0 ? (
                <Fragment>
                  (
                  <small
                    className={differenceTransfersCountClass}
                  >{`${differenceTransfersCount}`}</small>
                  )
                </Fragment>
              ) : null}
            </span>
          </div>
        </div>
        <div className={taskTransactionUpdateCount}>
          <div className="summary__list__item__param">
            <small>{t('trans-update')}</small>
          </div>
          <div className="summary__list__item__param">
            <span>
              {summary.task_transaction_update_count}
              {differenceCountTransaction !== 0 ? (
                <Fragment>
                  (
                  <small
                    className={differenceCountTransactionClass}
                  >{`${differenceCountTransaction}`}</small>
                  )
                </Fragment>
              ) : null}
            </span>
          </div>
        </div>
        <div className={taskTransferNotificationCount}>
          <div className="summary__list__item__param">
            <small>{t('trans-notific')}</small>
          </div>
          <div className="summary__list__item__param">
            <span>
              {summary.task_transfer_notification_count}
              {differenceCounter !== 0 ? (
                <Fragment>
                  (
                  <small
                    className={differenceCounterClass}
                  >{`${differenceCounter}`}</small>
                  )
                </Fragment>
              ) : null}
            </span>
          </div>
        </div>
      </div>
      <div className="node__summary__list">
        {summary.nodes.map(el => {
          const nodeListIsOnline = classNames({
            node_list_is_online_true: el.is_online,
            node_list_is_online_false: el.is_online == false
          });
          return (
            <div className="node__summary__list__item" key={el.id}>
              <div className="node__summary__list__item__param">
                <div>
                  <small>{t('s-id')}</small> {el.id}
                </div>
                <div>
                  <small>{t('s-name')}:</small> <span>{el.name}</span>
                </div>
                <div className="status">
                  <small>
                    Статус:
                    <span className={nodeListIsOnline}>
                      {el.is_online ? ' online' : ' offline'}
                    </span>{' '}
                  </small>
                </div>
              </div>
              <div className="node__summary__list__item__param">
                <small>
                  {t('s-link')}
                  <Copy copy={el.url} />
                </small>
                <h4>
                  <span>{el.url}</span>
                </h4>
              </div>
              <div className="node__summary__list__item__param">
                <small>{t('s-balance')}</small>
                <h4>{el.balance}</h4>
              </div>
              <div className="node__summary__list__item__param">
                <small>{t('s-net')}</small>
                <h4>{el.chain}</h4>
              </div>
              <div className="node__summary__list__item__param">
                <small>{t('s-hcount')}</small>
                <h4>{el.headers}</h4>
              </div>
              <div className="node__summary__list__item__param">
                <small>{t('s-block')}</small>
                <h4>{el.blocks}</h4>
              </div>
              <div className="node__summary__list__item__param">
                <small>
                  {t('s-best-hash')}
                  <Copy copy={el.best_block_hash} />
                </small>
                <h4>
                  <span>{el.best_block_hash}</span>
                </h4>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Summary;
