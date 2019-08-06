import React, { useState, useRef } from 'react';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import api from 'services/api';
import Modal from 'components/modal.js';


const CreateAddressModal = (props) => {

    const { t } = useTranslation();

    const modalWithCallback = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [node, setNode] = useState([]);
    const [createAddress, setCreateAddres] = useState({
        node_id: "",
        type: "",
    });

    function open() {
        evFetchData()
        modalWithCallback.current.show()
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

    function cleanForm() {
        setCreateAddres({
            node_id: "",
            type: "",
        });
    }

    async function evFetchDataCreate() {
        setIsLoading(true);

        try {

            await api.address.create(createAddress);
            props.fetch();

        } catch (error) { }
        finally {
            setIsLoading(false);
        }
    };



    function handleAddressCreateClick() {
        evFetchDataCreate();
        cleanForm();
    };

    function handleTypeAddressChange(event, name) {
        let value = event.target.value;

        if (name == "node_id")
            value = Number(value);

        setCreateAddres(createAddress => ({ ...createAddress, [name]: value }))
    };

    const type = ['p2pkh', 'p2sh-segwit', 'bech32'];

    if (!node) {
        return alert("Нет ноды");
    }

    return (
        <React.Fragment>
            <button className="main_button" onClick={() => open()}>{t('cam-create')}</button>
            <Modal
                ref={modalWithCallback}
                title={t('cam-create')}
                footer={{
                    ok: { label: t('cam-badd'), callback: handleAddressCreateClick },
                    cancel: { label: t('cam-clear'), callback: cleanForm },
                }}
            >
                <div className="select_margin">{t('cam-ltype')}:</div>
                <select className="select_modal" name="type" onChange={(event) => handleTypeAddressChange(event, "type")} value={createAddress.type}>
                    <option value="">{t('cam-otype')}</option>
                    {type.map((el) => {
                        return (
                            <option className="select-modal__type" value={el} key={el} >{el}</option>
                        );
                    })}
                </select>
                <div className="select_margin">{t('cam-lnode')}:</div>
                <select className="select_modal" onChange={(event) => handleTypeAddressChange(event, "node_id")} value={createAddress.node_id}>
                    <option value="">{t('cam-onode')}</option>
                    {node.map((el, i) => {
                        const nodeTrue = el.can_address ? <option className="select-modal__type"
                            value={el.id} key={i} >{el.id} {el.host} {el.port}</option> : null
                        return (
                            nodeTrue
                        );
                    })}
                </select>

            </Modal>
        </React.Fragment >
    );
}

export default CreateAddressModal;