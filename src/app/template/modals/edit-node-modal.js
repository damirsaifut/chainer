import React, { useState, useRef } from 'react';
import SimpleReactValidator from "simple-react-validator";
import { useTranslation } from 'react-i18next';

import api from 'services/api';
import Modal from 'components/modal.js';

const EditNodeModal = (props) => {
    const { t } = useTranslation();

    const rules = {
        className: "srv-validation-message",
        messages: {
            alpha_num_dash: t('v-an-dash'),
            min: t('v-min'),
            max: t('v-max'),
            repassword: t('v-repass'),
            host: t('v-host'),
            endpoint: t('v-endp'),  // will override all messages
            required: t('v-req')
        },
        validators: {
            repassword: {  // name the rule
                rule: (val) => {
                    return val
                },// optional 
            },
            host: {  // name the rule
                message: 'The :attribute must be a valid IP address and must be :values.',
                rule: (val, params, validator) => {
                    return validator.helpers.testRegex(val, /^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/i) ||
                        validator.helpers.testRegex(val, /^(https?:\/\/)?([\w\.]+)\.([a-z]{2,6}\.?)(\/[\w\.]*)*\/?$/) && params.indexOf(val) === -1
                },
                required: true,
                alpha_num_dash: true
            },
            endpoint: {  // name the rule
                message: 'The :attribute must be a valid IP address and must be :values.',
                rule: (val, params, validator) => {
                    return validator.helpers.testRegex(val, /^[.]*?\/*[\w*\/*]+([.]\w+)?$/i) && params.indexOf(val) === -1
                },
                required: true
            },
        },

    }

    const initState = {
        login: "",
        password: "",
        port: "",
        name: "",
        can_address: false,
        can_transfer: false,
        can_sync: false,
        is_active: false,
        is_cold: false,
        host: "",
        endpoint: ""
    }

    const { nodeId } = props;
    const [nodeInfo, setNodeInfo] = useState(initState)
    const [nodeEdit, setNodeEdit] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [validatorShow, setValidatorShow] = useState(false);
    const [rePassword, setRePassword] = useState(false);
    const modalWithCallback = useRef(null);
    const [validator, setValidator] = useState(new SimpleReactValidator({ ...rules }));

    function open() {
        fetch();
        modalWithCallback.current.show();

    }

    function closeMessages() {
        setValidator(validator => new SimpleReactValidator({ ...rules, mssagesShown: 0 }))
        setValidatorShow(false);
    }

    function cleanForm() {
        setNodeInfo(initState);
        setNodeEdit(null);
        closeMessages()
    }

    function submitForm() {
        if (nodeEdit !== null) {
            if (validator.allValid()) {
                EditDataNode()
            } else {
                validator.showMessages();
                setValidatorShow(true);
                forceUpdate();
            }
        } else {
            alert("Нода не изменена")
        }
    }

    function inputChange(event, name) {
        let value = event.target.value;

        if (name == "port") {
            value = Number(value);
        }
        if (name !== "rePassword") {
            setNodeInfo(nodeInfo => ({ ...nodeInfo, [name]: value }))
            setNodeEdit(nodeEdit => ({ ...nodeEdit, [name]: value }))
        } else {
            setNodeInfo(nodeInfo => ({ ...nodeInfo, [name]: value }))
        }
    }

    function inputCheck(event, name) {

        let value = event.target.checked;
        setNodeInfo(nodeInfo => ({ ...nodeInfo, [name]: value }))
        setNodeEdit(nodeEdit => ({ ...nodeEdit, [name]: value }))
    }

    async function fetch() {
        setIsLoading(true)

        try {

            const res = await api.node.get({ id: nodeId });
            setNodeInfo(nodeInfo => ({ ...res, rePassword: "", password: "" }));

        } catch (error) { console.warn(error); }
        finally {

            setIsLoading(false)
        }
    };

    async function EditDataNode(obj) {
        let info = nodeEdit;
        info.id = nodeId;

        try {

            await api.node.update(info);
            props.fetch();

        } catch (error) { console.warn(error); }
        finally {

        }
    };

    return (
        <React.Fragment>
            <button title={t('en-title')} className="node__list__item__param__button" onClick={() => open()}>
                {/* <div
                    className="svg edit_img"
                    dangerouslySetInnerHTML={{ __html: require('assets/img/edit.svg') }}
                    alt={t('en-title')}
                    onClick={() => open()}
                > */}
                <small>{t('edit')}</small>
                {/* </div> */}
            </button>
            <Modal
                ref={modalWithCallback}
                title={t('en-title')}
                footer={{
                    ok: { label: t('seu-bchange'), callback: submitForm },
                    cancel: { label: t('en-cform'), callback: cleanForm }

                }}
            >
                <div className="row">
                    <div className="col-sm-24 col-xs-24">{t('en-lnode')}
                        <input
                            className="append node"
                            name="name"
                            value={nodeInfo.name}
                            type="text"
                            onChange={(event) => inputChange(event, "name")} />
                        {validator.message('name', nodeInfo.name, 'required|alpha_num_dash_space|min:5')}
                    </div>
                    <div className="col-sm-12 col-xs-12">
                        {t('en-lhost')}
                        <input
                            className="append host"
                            value={nodeInfo.host}
                            name="host"
                            type="text"
                            onChange={(event) => inputChange(event, "host")} />
                        {validator.message('host', nodeInfo.host, 'required|host')}
                    </div>
                    <div className="col-sm-12 col-xs-12">{t('en-lport')}
                        <input
                            className="append port"
                            name="port"
                            value={Number(nodeInfo.port)}
                            type="number"
                            onChange={(event) => inputChange(event, "port")} />
                        {validator.message('port', nodeInfo.port, 'required|integer')}
                    </div>
                    <div className="col-sm-24 col-xs-24">{t('en-endp')}
                        <input
                            className="append endpoint"
                            name="endpoint"
                            value={nodeInfo.endpoint}
                            type="text"
                            onChange={(event) => inputChange(event, "endpoint")} />
                        {validator.message('endpoint', nodeInfo.endpoint, 'required|endpoint')}
                    </div>
                    <div className="col-sm-24 col-xs-24">
                        {t('en-llogin')}
                        <input
                            className="append login"
                            name="login"
                            value={nodeInfo.login}
                            type="text"
                            onChange={(event) => inputChange(event, "login")} />
                        {validator.message('login', nodeInfo.login, 'alpha_num_dash_space|min:5')}
                    </div>
                    <div className="col-sm-12 col-xs-12">
                        {t('en-lpass')}
                        <input
                            name="password"
                            className="append password"
                            value={nodeInfo.password}
                            type="password"
                            onChange={(event) => inputChange(event, "password")} />
                        {validator.message('password', nodeInfo.password, 'alpha_num_dash_space')}
                    </div>
                    <div className="col-sm-12 col-xs-12">
                        {t('en-ldpass')}
                        <input
                            className="append password"
                            name="repassword"
                            value={nodeInfo.repassword}
                            type="password"
                            onChange={(event) => inputChange(event, "rePassword")} />
                        {nodeInfo.password !== nodeInfo.rePassword ? validator.message('repassword', rePassword, 'alpha_num_dash_space|repassword') :
                            validator.message('repassword', !rePassword, 'alpha_num_dash_space|repassword')}
                    </div>

                </div>
                <div className="row">
                    <div className="col-sm-24 col-xs-24">
                        <label>
                            <input type="checkbox" name="can_address" checked={nodeInfo.can_address} onChange={(event) => inputCheck(event, "can_address")} />
                            <span>can_address</span>
                        </label>
                    </div>
                    <div className="col-sm-24 col-xs-24">
                        <label>
                            <input type="checkbox" name="can_sync" checked={nodeInfo.can_sync} onChange={(event) => inputCheck(event, "can_sync")} />
                            <span>can_sync</span>
                        </label>
                    </div>
                    <div className="col-sm-24 col-xs-24">
                        <label>
                            <input type="checkbox" name="can_transfer" checked={nodeInfo.can_transfer} onChange={(event) => inputCheck(event, "can_transfer")} />
                            <span>can_transfer</span>
                        </label>
                    </div>
                    <div className="col-sm-24 col-xs-24">
                        <label>
                            <input type="checkbox" name="is_active" checked={nodeInfo.is_active} onChange={(event) => inputCheck(event, "is_active")} />
                            <span>is_active</span>
                        </label>
                    </div>
                    <div className="col-sm-24 col-xs-24">
                        <label>
                            <input type="checkbox" name="is_cold" checked={nodeInfo.is_cold} onChange={(event) => inputCheck(event, "is_cold")} />
                            <span>is_cold</span>
                        </label>
                    </div>
                </div>
            </Modal>
        </React.Fragment >
    );
}
export default EditNodeModal;