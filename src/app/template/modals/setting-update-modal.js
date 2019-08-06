import React, { useState, Fragment, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import api from 'services/api';
import Modal from 'components/modal.js';


const SettingUpdateModal = (props) => {
    const { t } = useTranslation();
    const modalWithCallback = useRef(null);
    const [isLoadings, setIsLoadings] = useState(false);
    const [update, setUpdate] = useState({
        param: "",
        value: "",
    });

    function open() {
        modalWithCallback.current.show()
    }

    function cleanForm() {
        setUpdate({
            param: "",
            value: "",
        });
    }

    async function evFetchDataCreate() {

        try {
            await api.setting.update(update);

            props.fetch();

        } catch (error) { }
        finally {
        }
    };

    if (isLoadings) {
        return (<div className="spinner"></div>);
    }

    function handleUpdateClick() {
        evFetchDataCreate();
    };

    function handleUpdateChange(event, name) {
        let value = event.target.value;
        setUpdate(update => ({ ...update, [name]: value }))
    };


    return (
        <Fragment>
            <button className="main_button" onClick={() => open()}>{t('sum-sadd')}</button>
            <Modal
                ref={modalWithCallback}
                title={t('sum-title')}
                footer={{
                    ok: { label: t('sum-badd'), callback: handleUpdateClick },
                    cancel: { label: t('sum-bclear'), callback: cleanForm },
                }}
            >
                <div className="select_margin">{t('sum-pname')}</div>
                <input type="text" className="select_modal" name="type" onChange={(event) => handleUpdateChange(event, "param")} value={update.param} />
                <div className="select_margin">{t('sum-pvalue')}</div>
                <input type="text" className="select_modal" name="type" onChange={(event) => handleUpdateChange(event, "value")} value={update.value} />
            </Modal>
        </Fragment >
    );
}


export default SettingUpdateModal;