import React, { useState, Fragment, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import api from 'services/api';
import Modal from 'components/modal.js';

const AppendAddressModal = () => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [hash, setHash] = useState("");
    const modalWithCallback = useRef(null);

    function handleAppendAddress(event) {
        const value = event.target.value;
        setHash(value);
    };

    function cleanForm() {
        setHash("");
    }

    async function evFetchDataAppend() {

        setIsLoading(true);

        try {

            await api.address.append({ hash: hash });

            props.fetch();

        } catch (error) { }
        finally {

            setIsLoading(false);
        }
    };

    function handleAddressAppendClick() {
        evFetchDataAppend();
    };

    return (<Fragment>
        <button className="main_button" onClick={() => modalWithCallback.current.show()}>{t('aam-address')}</button>
        <Modal
            ref={modalWithCallback}
            title={t('aam-address')}
            footer={{
                ok: { label: t('aam-add'), callback: handleAddressAppendClick },
                cancel: { label: t('aam-cform'), callback: cleanForm }

            }}>
            <input className="append" type="text" onChange={(event) => handleAppendAddress(event)} placeholder={t('aam-phash')} />
        </Modal>
    </Fragment>
    );
}

export default AppendAddressModal;