import React from 'react';
import { useTranslation } from 'react-i18next';

const EmptyData = () => {
    const { t } = useTranslation();

    return <h1>{t('empty')}</h1>;
}

export default EmptyData;
