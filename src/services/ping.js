import React, { Fragment, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import api from 'services/api';

const Ping = () => {

    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [ping, setIsPing] = useState(false);



    useEffect(() => {
        const throttle = setInterval(() => {
            fetch();
        }, 60000);

        fetch();
        return () => {
            clearInterval(throttle);
        };
    }, [])

    async function fetch() {
        setIsLoading(true)

        try {
            const res = await api.ping.ping();
            setIsPing(res);
        } catch (error) { }
        finally {
            setIsLoading(false)
        }
    }

    if (isLoading) {
        return (
            <Fragment>{t('loading')}</Fragment>
        );
    }

    const status = ping ? "online" : "offline";

    return (
        <div className="api">API&nbsp;
            <span className={status}>
                {status}
            </span>
            {
                ping ? (<div className="api-version">v {ping.version}</div>) : null
            }
        </div>
    );
};

export default Ping;