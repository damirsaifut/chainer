import React from 'react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

const FilterPayment = ({ filter, onFilter, onFilterDate, onDate, date }) => {

    const { t } = useTranslation();
    const statusSelect = {
        [t('p-fsall')]: "all",
        [t('p-fsnew')]: "new",
        [t('p-fspros')]: "processing",
        [t('p-fsmem')]: "mempool",
        [t('p-fsconfirm')]: "confirmation",
        [t('p-fscomp')]: "complete",
        [t('p-fsinvalid')]: "invalid"
    }
    const typeSelect = {
        [t('p-ftall')]: "all",
        [t('p-ftincom')]: "incoming",
        [t('p-outgo')]: "outgoing",
    }

    return (
        <div className="filter">
            <div className="row justify-left">
                <div className="col">
                    <div className="text">{t('p-fstatus')}</div>
                    <select className="filter-select-payment" name="status" value={filter.status} onChange={() => onFilter(event, "status")}>
                        {Object.keys(statusSelect).map((el, i) => {
                            return (
                                <option value={statusSelect[el]} key={el} >{el}</option>
                            );
                        })}
                    </select>
                </div>
                <div className="col">
                    <div className="text">{t('p-ftype')}</div>
                    <select className="filter-select-payment" name="type" value={filter.type} onChange={() => onFilter(event, "type")}>
                        {Object.keys(typeSelect).map((el, i) => {
                            return (
                                <option value={typeSelect[el]} key={el} >{el}</option>
                            );
                        })}
                    </select>
                </div>
                <div className="col-date">
                    <div className="text">{t('p-fdate')}</div>
                    <input type="date" className="date" onChange={() => onDate(event, "start_stamp")} value={moment(date.start_stamp * 1000).format('YYYY-MM-DD')} />
                    <input type="date" className="date" onChange={() => onDate(event, "end_stamp")} value={moment(date.end_stamp * 1000).format('YYYY-MM-DD')} />
                    <button className="filter_button_date" onClick={() => onFilterDate()}>{t('p-fbapply')}</button>
                    {/* </div> */}
                </div>
                <div className="col">
                    <div className="text">{t('p-faddress')}</div>
                    <input type="text" className="filter-hash" onChange={() => onFilter(event, "address")} value={filter.address} />
                </div>
            </div>
        </div >
    )
};

export default FilterPayment;