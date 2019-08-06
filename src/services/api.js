import { HttpTransport } from "./http";

export default {
    address: {
        async list(...params) {
            return await HttpTransport("address.list", ...params);
        },

        async create(...params) {
            return await HttpTransport("address.create", ...params);
        },

        async append(...params) {
            return await HttpTransport("address.append", ...params);
        }
    },

    node: {
        async list(...params) {
            return await HttpTransport("node.list", ...params);
        },

        async append(...params) {
            return await HttpTransport("node.append", ...params);
        },

        async delete(...params) {
            return await HttpTransport("node.delete", ...params);
        },

        async update(...params) {
            return await HttpTransport("node.update", ...params);
        },

        async get(...params) {
            return await HttpTransport("node.get", ...params);
        },

        async sendRawTransaction(...params) {
            return await HttpTransport("node.sendrawtransaction", ...params);
        }
    },

    transfer: {
        async list(...params) {
            return await HttpTransport("transfer.list", ...params);
        },

        async create(...params) {
            return await HttpTransport("transfer.create", ...params);
        },

        async get(...params) {
            return await HttpTransport("transfer.get", ...params);
        }
    },

    explorer: {
        async list(...params) {
            return await HttpTransport("explorer.block.list", ...params);
        },

        async get(...params) {
            return await HttpTransport("explorer.block.get", ...params);
        },

        async getTransaction(...params) {
            return await HttpTransport("explorer.transaction.get", ...params);
        },

        async search(...params) {
            return await HttpTransport("explorer.search", ...params);
        },

        async addressGet(...params) {
            return await HttpTransport("explorer.address.get", ...params);
        }
    },

    mempool: {
        async get(...params) {
            return await HttpTransport("mempool.get", ...params);
        }
    },

    ping: {
        async ping(...params) {
            return await HttpTransport("ping", ...params);
        }
    },

    summary: {
        async info(...params) {
            return await HttpTransport("summary.info", ...params);
        }
    },

    setting: {
        async list(...params) {
            return await HttpTransport("setting.list", ...params);
        },

        async update(...params) {
            return await HttpTransport("setting.update", ...params);
        },

        async delete(...params) {
            return await HttpTransport("setting.delete", ...params);
        }
    }
};