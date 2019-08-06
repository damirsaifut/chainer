import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Redirect } from "react-router-dom"
import { withRouter } from "react-router-dom";

import api from 'services/api';
import Modal from 'components/modal.js';

const AddressGetModal = ({ hash }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [addressGet, setAddressGet] = useState(null);
    const modalWithCallback = useRef(null);
    const { t } = useTranslation();

    function open() {
        fetch();
        modalWithCallback.current.show();

    }


    const fetch = async () => {

        setIsLoading(true)

        try {
            const res = await api.explorer.addressGet({ hash });
            setAddressGet(res);
        } catch (error) { }
        finally {
            setIsLoading(false)
        }
    }

    return (<>
        <button className="address__list__item__param__button" onClick={() => open()}>{t('detail')}</button>
        <Modal
            ref={modalWithCallback}
            title="Детали адреса"
            footer={{
                ok: { label: <Link to={`/explorer/block_address_get/${hash}`}>{t('detailed')}</Link>, callback: "" },
                // cancel: { label: t('en-cform'), callback: cleanForm }

            }}
        > {
                addressGet ?
                    <>
                        <div className="address__modal__content__item">
                            <div className="title">{t('eag-id')}</div>
                            <div className="value">{addressGet.address.id}</div>
                        </div>
                        <div className="address__modal__content__item">
                            <div className="title">{t('eag-acontrol')}</div>
                            <div className="value">{addressGet.address.control}</div>
                        </div>
                        <div className="address__modal__content__item">
                            <div className="title">{t('eag-hash')}</div>
                            <div className="value">{addressGet.address.hash}</div>
                        </div>
                        <div className="address__modal__content__item">
                            <div className="title">{t('eag-bal')}</div>
                            <div className="value">{addressGet.balance}</div>
                        </div>
                        <div className="address__modal__content__item">
                            <div className="title">{t('eag-nid')}</div>
                            <div className="value">{addressGet.address.node_id ? addressGet.address.node_id : "—"}</div>
                        </div>
                        <div className="address__modal__content__item">
                            <div className="title">{t('eag-atype')}</div>
                            <div className="value">{addressGet.address.type}</div>
                        </div>
                    </>
                    : null
            }
        </Modal>
    </>);

}

export default withRouter(AddressGetModal);