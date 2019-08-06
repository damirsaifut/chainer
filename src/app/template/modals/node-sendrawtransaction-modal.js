import React, { useState, useRef, Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import api from 'services/api';
import Modal from 'components/modal.js';


const NodeSendRawTransaction = (props) => {

    const { t } = useTranslation();

    const modalWithCallback = useRef(null);
    const [sendRaw, setSendRaw] = useState({
        data: "",
        node_id: undefined,
    });
    const [node, setNode] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    function open() {
        modalWithCallback.current.show();
        evFetchData();
    };

    function cleanForm() {
        setSendRaw({
            data: "",
            node_id: undefined,
        });
    }

    async function evFetchData() {
        setIsLoading(true);

        try {
            const res = await api.node.list();
            setNode(res);

        } catch (error) { }
        finally {

            setIsLoading(false);
        }
    };

    async function evFetchDataCreate() {
        setIsLoading(true);
        let query = sendRaw;

        if (sendRaw.node_id == 0)
            query = {
                data: sendRaw.data
            };

        try {

            await api.node.sendRawTransaction(query);
            props.fetch();

        } catch (error) { }
        finally {
            setIsLoading(false);
        }
    };

    function formOnChange(event, name) {
        let value = event.target.value;

        if (name == "node_id")
            value = Number(value);

        setSendRaw(sendRaw => ({ ...sendRaw, [name]: value }));
    };

    function handleAddressCreateClick() {
        evFetchDataCreate();
        cleanForm();
    };

    if (!node) {
        return alert("Нет ноды");
    }

    return (
        <Fragment>
            <button className="main_button" onClick={() => open()}>{t('cam-sendRaw')}</button>
            <Modal
                ref={modalWithCallback}
                title={t('cam-sendRaw')}
                footer={{
                    ok: { label: t('cam-send'), callback: handleAddressCreateClick },
                    cancel: { label: t('cam-clear'), callback: cleanForm },
                }}
            >
                <div className="select_margin">{t('cam-hashTransaction')}:</div>
                <textarea
                    rows="10"
                    id="formControlsTextarea"
                    className="textarea-modal"
                ></textarea>
                <div className="select_margin">{t('cam-lnode-send')}:</div>
                <select className="select_modal" onChange={(event) => formOnChange(event, "node_id")} value={sendRaw.node_id}>
                    <option value="">{t('cam-onode')}</option>
                    {node.map((el, i) => {
                        return (
                            <option className="select-modal__type"
                                value={el.id} key={i} >{el.id} {el.host} {el.port}</option>
                        );
                    })}
                </select>
            </Modal>
        </Fragment >
    );
};

export default NodeSendRawTransaction;