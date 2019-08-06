import React, { useState } from 'react';

import Tabs from 'components/tabs/tabs';
import Tab from 'components/tabs/tab';

import AddressListInfo from './info/address-list-info';
import AddressCreateInfo from './info/address-create-info';
import AddressAppendInfo from './info/address-append-info'
import NodeListInfo from './info/node-list-info';
import NodeAppendInfo from './info/node-append-info';
import NodeDeleteInfo from './info/node-delete-info';
import NodeGetInfo from './info/node-get-info'
import NodeUpdateInfo from './info/node-update-info';
import TransferListInfo from './info/transfer-list-info';
import TransferCreateInfo from './info/transfer-create-info'
import TransferGetInfo from './info/transfer-get-info';
import ExplorerBlockListInfo from './info/explorer-block-list-info';
import ExplorerBlockGetInfo from './info/explorer-block-get-info';
import ExplorerTransactionGetInfo from './info/explorer-transaction-get-info';
import ExplorerAddressGetInfo from './info/explorer-address-get';
import ExplorerSearchInfo from './info/explorer-search-info';
import MempoolGetInfo from './info/mempool-get-info';
import SummaryInfo from './info/summary-info';
import PingInfo from './info/ping-info';
import NotificationUrl from './info/notification-url'

const Docs = () => {

    const [selectedTab, setSelectedTab] = useState("address-list");

    return (
        <div className="docs">
            <div className="docs__wrapper">
                <Tabs
                    selectedTab={selectedTab}
                    onChangeTab={selectedTab => setSelectedTab(selectedTab)}
                >
                    <Tab name="address-list" title="address.list" type="query">
                        <AddressListInfo />
                    </Tab>
                    <Tab name="address-create" title="address.create" type="query">
                        <AddressCreateInfo />
                    </Tab>
                    <Tab name="address-append" title="address.append" type="query">
                        <AddressAppendInfo />
                    </Tab>
                    <Tab name="node-list" title="node.list" type="query">
                        <NodeListInfo />
                    </Tab>
                    <Tab name="node-append" title="node.append" type="query">
                        <NodeAppendInfo />
                    </Tab>
                    <Tab name="node-delete" title="node.delete" type="query">
                        <NodeDeleteInfo />
                    </Tab>
                    <Tab name="node-get" title="node.get" type="query">
                        <NodeGetInfo />
                    </Tab>
                    <Tab name="node-update" title="node.update" type="query">
                        <NodeUpdateInfo />
                    </Tab>
                    <Tab name="transfer-list" title="transfer.list" type="query">
                        <TransferListInfo />
                    </Tab>
                    <Tab name="transfer-create" title="transfer.create" type="query">
                        <TransferCreateInfo />
                    </Tab>
                    <Tab name="transfer-get" title="transfer.get" type="query">
                        <TransferGetInfo />
                    </Tab>
                    <Tab name="explorer-block-list" title="explorer.block.list" type="query">
                        <ExplorerBlockListInfo />
                    </Tab>
                    <Tab name="explorer-block-get" title="explorer.block.get" type="query">
                        <ExplorerBlockGetInfo />
                    </Tab>
                    <Tab name="explorer-transaction-get" title="explorer.transaction.get" type="query">
                        <ExplorerTransactionGetInfo />
                    </Tab>
                    <Tab name="explorer-address-get" title="explorer.address.get" type="query">
                        <ExplorerAddressGetInfo />
                    </Tab>
                    <Tab name="explorer-search" title="explorer.search" type="query">
                        <ExplorerSearchInfo />
                    </Tab>
                    <Tab name="mempool-get" title="mempool.get" type="query">
                        <MempoolGetInfo />
                    </Tab>
                    <Tab name="summary-info" title="summary.info" type="query">
                        <SummaryInfo />
                    </Tab>
                    <Tab name="ping" title="ping" type="query">
                        <PingInfo />
                    </Tab>
                    <Tab name="notification_url" title="notification_url" type="callback">
                        <NotificationUrl />
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
};

export default Docs;