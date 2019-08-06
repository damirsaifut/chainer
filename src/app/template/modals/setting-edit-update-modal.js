import React, { useState, Fragment, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import api from 'services/api';
import Modal from 'components/modal.js';


const SettingEditUpdateModal = (props) => {

    const { t } = useTranslation();

    const modalWithCallback = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [setting, setSetting] = useState({
        param: "",
        value: "",
    });

    function submitForm() {
        evFetchDataCreate();
    }

    useEffect(() => {
        const { param, value } = props;

        setSetting({
            param: param,
            value: value,
        })
    }, [props])

    async function evFetchDataCreate() {

        try {

            await api.setting.update(setting);
            props.fetch()
        } catch (error) { }
        finally {

        }
    };

    function cleanForm() {
        setSetting({
            param: "",
            value: "",
        });
    }

    function setStateFromInput(event, name) {
        const value = event.target.value;
        setSetting(setting => ({ ...setting, [name]: value }));

    }

    if (isLoading) {
        return (<div className="spinner"></div>);
    }

    return (
        <Fragment>
            <button title={t('seu-tbedit')} className="setting__list__item__param__button" onClick={() => modalWithCallback.current.show()}>
                {/* <div
                    className="svg edit_img"
                    dangerouslySetInnerHTML={{ __html: require('assets/img/edit.svg') }}
                    alt={t('seu-title')}
                    onClick={() => modalWithCallback.current.show()}
                >
                </div> */}
                <small>{t('edit')}</small>
            </button>
            <Modal
                ref={modalWithCallback}
                title={t('seu-title')}
                footer={{
                    ok: { label: t('seu-bchange'), callback: submitForm }
                }}
            >
                <div className="row">
                    <div className="col-sm-24 col-xs-24">{t('seu-lname')}
                        <input
                            className="append"
                            name="setting"
                            type="text"
                            value={setting.param}
                            onChange={() => setStateFromInput(event, "param")} readOnly />
                    </div>
                    <div className="col-sm-24 col-xs-24">
                        {t('seu-lval')}
                        <input
                            className="append"
                            name="value"
                            value={setting.value}
                            type="text"
                            onChange={() => setStateFromInput(event, "value")} />
                    </div>
                </div>
            </Modal>
        </Fragment >
    );
}

export default SettingEditUpdateModal;