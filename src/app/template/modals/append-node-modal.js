import React, { useState, useRef, } from 'react';
import api from 'services/api';
import SimpleReactValidator from "simple-react-validator";
import { useTranslation } from 'react-i18next';

import Modal from 'components/modal.js';

const AppendNodeModal = (props) => {
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
                required: true
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

    const modalWithCallback = useRef(null);
    const [validatorShow, setValidatorShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [rePassword, setRePassword] = useState("");
    const [node, setNode] = useState(initState)
    const [validator, setValidator] = useState(new SimpleReactValidator({ ...rules }));

    function closeMessages() {
        setValidator(validator => new SimpleReactValidator({ ...rules, mssagesShown: 0 }))
        setValidatorShow(false);
    }

    function cleanForm() {
        setNode(initState);
        closeMessages()
    }

    function submitForm() {

        if (validator.allValid()) {
            evFetchAppendNode();
        } else {
            validator.showMessages();
            setValidatorShow(true);
            forceUpdate();
        }
    }

    function inputChange(event, name) {
        let value = event.target.value;
        if (name == "port") {
            value = Number(value);
        }
        if (name !== "rePassword")
            setNode(node => ({ ...node, [name]: value }))
        if (name == "rePassword") {
            setRePassword(value);
        }
    }

    function inputCheck(event, name) {
        let value = event.target.checked;
        setNode(node => ({ ...node, [name]: value }))
    }

    async function evFetchAppendNode(params) {
        setIsLoading(!isLoading)

        try {

            await api.node.append(node);

            if (props.evFetch) {
                props.evFetch()
            }

        } catch (error) { console.warn(error); }
        finally {

            setIsLoading(!isLoading)
        }
    };

    return (
        <React.Fragment>
            <button className="main_button" onClick={() => modalWithCallback.current.show()}>{t('n-add-btn')}</button>
            <Modal
                ref={modalWithCallback}
                title={t('an-title')}
                footer={{
                    ok: { label: t('an-nadd'), callback: submitForm },
                    cancel: { label: t('an-cform'), callback: cleanForm }

                }}
            >
                <div className="row">
                    <div className="col-sm-24 col-xs-24">{t('an-lnode')}
                        <input
                            className="append node"
                            name="name"
                            type="text"
                            value={node.name}
                            onChange={(event) => inputChange(event, "name")} />
                        {validator.message('name', node.name, 'required|alpha_num_dash|min:5|max:15')}
                    </div>
                    <div className="col-sm-12 col-xs-12">
                        {t("an-lhost")}
                        <input
                            className="append host"
                            value={node.host}
                            name="host"
                            type="text"
                            onChange={(event) => inputChange(event, "host")} />
                        {validator.message('host', node.host, 'required|host')}
                    </div>
                    <div className="col-sm-12 col-xs-12">
                        {t("an-lport")}
                        <input
                            className="append port"
                            name="port"
                            type="number"
                            value={node.port}
                            onChange={(event) => inputChange(event, "port")} />
                        {validator.message('port', node.port, 'required|integer')}
                    </div>
                    <div className="col-sm-24 col-xs-24">
                        {t("an-endp")}
                        <input
                            className="append endpoint"
                            name="endpoint"
                            type="text"
                            value={node.endpoint}
                            onChange={(event) => inputChange(event, "endpoint")} />
                        {validator.message('endpoint', node.endpoint, 'required|endpoint')}
                    </div>
                    <div className="col-sm-24 col-xs-24">
                        {t('an-llogin')}
                        <input
                            className="append login"
                            name="login"
                            value={node.login}
                            type="text"
                            onChange={(event) => inputChange(event, "login")} />
                        {validator.message('login', node.login, 'alpha_num_dash|min:5')}
                    </div>
                    <div className="col-sm-12 col-xs-12">
                        {t('an-lpass')}
                        <input
                            name="password"
                            className="append password"
                            type="password"
                            value={node.password}
                            onChange={(event) => inputChange(event, "password")} />
                        {validator.message('password', node.password, 'alpha_num_dash_space')}
                    </div>
                    <div className="col-sm-12 col-xs-12">
                        {t("an-ldpass")}
                        <input
                            className="append password"
                            name="rePassword"
                            type="password"
                            onChange={(event) => inputChange(event, "rePassword")} />
                        {node.password !== rePassword ? validator.message('repassword', false, 'alpha_num_dash_space|repassword') :
                            validator.message('repassword', true, 'alpha_num_dash_space|repassword')}
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-24 col-xs-24">
                        <label>
                            <input type="checkbox" name="canAddress" checked={node.can_address}
                                onChange={(event) => inputCheck(event, "can_address")} />
                            <span>can_address</span>
                        </label>
                    </div>
                    <div className="col-sm-24 col-xs-24">
                        <label>
                            <input type="checkbox" name="canSync" checked={node.can_sync}
                                onChange={(event) => inputCheck(event, "can_sync")} />
                            <span>can_sync</span>
                        </label>
                    </div>
                    <div className="col-sm-24 col-xs-24">
                        <label>
                            <input type="checkbox" name="canTransfer" checked={node.can_transfer}
                                onChange={(event) => inputCheck(event, "can_transfer")} />
                            <span>can_transfer</span>
                        </label>
                    </div>
                    <div className="col-sm-24 col-xs-24">
                        <label>
                            <input type="checkbox" name="isActive" checked={node.is_active}
                                onChange={(event) => inputCheck(event, "is_active")} />
                            <span>is_active</span>
                        </label>
                    </div>
                    <div className="col-sm-24 col-xs-24">
                        <label>
                            <input type="checkbox" name="isCold" checked={node.is_cold}
                                onChange={(event) => inputCheck(event, "is_cold")} />
                            <span>is_cold</span>
                        </label>
                    </div>
                </div>
            </Modal>
        </React.Fragment>
    );
}


export default AppendNodeModal;