import React, { useState, useRef, Fragment } from 'react';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

import api from 'services/api';
import Modal from 'components/modal.js';


const CreateTransferModal = (props) => {

    const { t } = useTranslation();

    const modalWithCallback = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [transfer, setTransfer] = useState([
        ['', '', '']
    ]);

    function cleanForm() {
        setTransfer([
            ['', '', '']
        ]);
    }

    function addInput() {
        if (transfer.length < 20) {
            const array = [...transfer, ['', '', '']];
            setTransfer(array);
        }
    };

    function deleteInput() {
        if (transfer.length > 1) {
            const array = transfer;
            array.pop();
            setTransfer(array);
        }
    };

    function onChageValue(event, indexArray, indexField) {
        const array = [...transfer];
        if (indexField === 2) {
            array[indexArray][indexField] = event.target.value;
            return setTransfer(array);
        }

        if (indexField === 1) {

            if (event.target.value === '') {
                array[indexArray][indexField] = event.target.value;
                return setTransfer(array);
            }

            if (!Number(event.target.value) && event.target.value !== '0') return;

            array[indexArray][indexField] = Number(event.target.value);
            return setTransfer(array);
        }

        array[indexArray][indexField] = event.target.value;
        return setTransfer(array);
    };

    async function evFetchDataCreate(value) {
        // setIsLoading(true)

        try {
            await api.transfer.create(value);
            props.fetch();

        } catch (error) { }
        finally {

            // setIsLoading(false)
        };
    }

    function handleTransferCreateClick() {
        evFetchDataCreate(transfer);
    };

    return (
        <Fragment>
            <button className="main_button" onClick={() => modalWithCallback.current.show()}>{t('ctm-create')}</button>
            <Modal
                ref={modalWithCallback}
                title={t('ctm-title')}
                footer={{
                    ok: { label: t('ctm-bcreate'), callback: handleTransferCreateClick },
                    cancel: { label: t('ctm-bclear'), callback: cleanForm }
                }} >
                <div className="row">
                    {
                        transfer.map((item, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <div className="col-sm-24 col-xs-24">{t('ctm-lhash')}
                                        <input className="append" type="text" value={transfer[index][0]} onChange={ev => onChageValue(ev, index, 0)} />
                                    </div>
                                    <div className="col-sm-12 col-xs-12">{t('ctm-lam')}
                                        <input className="append" type="number" value={transfer[index][1]} onChange={ev => onChageValue(ev, index, 1)} />
                                    </div>
                                    <div className="col-sm-12 col-xs-12">{t('ctm-lon')}
                                        <input className="append" type="text" value={transfer[index][2]} onChange={ev => onChageValue(ev, index, 2)} />
                                    </div>
                                </React.Fragment>
                            );
                        })
                    }
                </div>
            </Modal>
        </Fragment >
    );
}


export default CreateTransferModal;

