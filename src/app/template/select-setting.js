import React, { useState, Fragment } from 'react';
import { useTranslation } from 'react-i18next';

import _ from "lodash";

import api from 'services/api';


const SelectSetting = (props) => {
    const { t } = useTranslation();
    const [isLoadings, setIsLoadings] = useState(false);

    const [val, setValue] = useState({
        incoming: "",
        outgoing: "",
    });
    const [setting, setSetting] = useState({
        param: "",
        value: ""
    });
    const transferIncomingAggregation = ["disable", "single", "time", "volume", "amount"];
    const transferOutgoingAggregation = ["disable", "time", "volume", "amount"];
    const blockchainUpdate = ["no_update", "delete_updated", "full"];

    function write(event, name) {
        let value = event.target.value;
        evFetchDataCreate(value, name)
    }

    async function evFetchDataCreate(value, name) {
        try {
            await api.setting.update({ param: name, value: value });
            props.fetch()
        } catch (error) { }
        finally {

        }
    };

    function settingValue(event, name) {
        let valueSet = event.target.value;
        valueSet = Number(valueSet)
        setValue(val => ({ ...val, [name]: valueSet }))
    }
    function save(name, value) {
        evFetchDataCreate(value, name)
    }
    if (props.setting) {
        if (props.setting.blockchain_update)
            _.pull(blockchainUpdate, props.setting.blockchain_update);

        if (props.setting.transfer_incoming_aggregation)
            _.pull(transferIncomingAggregation, props.setting.transfer_incoming_aggregation);

        if (props.setting.transfer_outgoing_aggregation)
            _.pull(transferOutgoingAggregation, props.setting.transfer_outgoing_aggregation);
    }
    return (
        <Fragment>
            <div className="control">
                <div className="control_select">
                    <span>blockchain_update:</span>
                    <select className="control_select_setting" name="blockchainUpdate" onChange={(event) => {
                        write(event, "blockchain_update")
                    }}>
                        <option value="">{!props.setting.blockchain_update ? t('ss-param') : props.setting.blockchain_update}</option>
                        {blockchainUpdate.map((el) => {
                            return (
                                <option className="select-modal__type" value={el} key={el} >{el}</option>
                            );
                        })}
                    </select>
                </div>
            </div>
            <div className="control">
                <span>transfer_incoming_aggregation:</span>
                <div className="control_select">
                    <select className="control_select_setting margin" name="transfer_incoming_aggregation" onChange={(event) =>
                        write(event, "transfer_incoming_aggregation")}>
                        <option value="">{!props.setting.transfer_incoming_aggregation ?
                            t('ss-param') :
                            props.setting.transfer_incoming_aggregation}</option>
                        {transferIncomingAggregation.map((el) => {
                            return (
                                <option className="select-modal__type" value={el} key={el} >{el}</option>
                            );
                        })}
                    </select>
                    <input className="control_select_setting__value" type="number" min="0" value={val.incoming} onChange={(event) =>
                        settingValue(event, "incoming")} />
                    {val.incoming ?
                        <button className="main_button main_button--setting"
                            onClick={() => save("transfer_incoming_aggregation_value", val.incoming)}>{t('ss-save')}</button> : null}
                </div>
            </div>
            <div className="control">
                <span>transfer_outgoing_aggregation:</span>
                <div className="control_select">
                    <select className="control_select_setting margin" name="transfer_outgoing_aggregation" onChange={(event) =>
                        write(event, "transfer_outgoing_aggregation")}>
                        <option value="">{!props.setting.transfer_outgoing_aggregation ?
                            t('ss-param') :
                            props.setting.transfer_outgoing_aggregation}</option>
                        {transferOutgoingAggregation.map((el) => {
                            return (
                                <option className="select-modal__type" value={el} key={el} >{el}</option>
                            );
                        })}
                    </select>
                    <input className="control_select_setting__value" type="number" min="0" value={val.outgoing} onChange={(event) =>
                        settingValue(event, "outgoing")} />

                    {val.outgoing ?
                        <button className="main_button main_button--setting"
                            onClick={() => save("transfer_outgoing_aggregation_value", val.outgoing)}>{t('ss-save')}</button> : null}
                </div>
            </div>

        </Fragment >
    );
}

export default SelectSetting;