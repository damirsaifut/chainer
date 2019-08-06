import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import SettingEditUpdateModal from "app/template/modals/setting-edit-update-modal";
import SettingUpdateModal from "app/template/modals/setting-update-modal";
import SelectUpdate from "app/template/select-setting";
import api from "services/api";
import EmptyData from "components/empty-data";

const Control = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [setting, setSetting] = useState([]);

  useEffect(() => {
    fetch();
  }, []);

  async function fetch() {
    setIsLoading(true);

    try {
      const res = await api.setting.list();
      setSetting(res);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  async function evSettingDelte(param) {
    setIsLoading(true);

    try {
      if (confirm(t("dconfirm"))) {
        const res = await api.setting.delete({ param });
        fetch();
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <div className="spinner" />;
  }

  if (!setting) {
    return (
      <React.Fragment>
        <EmptyData />
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-sm-24 col-lg-12 col-xs-24">
          <SelectUpdate setting={setting} fetch={fetch} />
          <SettingUpdateModal fetch={fetch} />
        </div>

        <div className="col-sm-24 col-lg-12 col-xs-24">
          <div className="setting__list">
            {setting &&
              Object.keys(setting).map((item, i) => (
                <div className="setting__list__item" key={i}>
                  <div className="setting__list__item__param">
                    <button
                      title={t("с-tbdelete")}
                      className="node__list__item__param__button"
                      onClick={() => evSettingDelte(item)}
                    >
                      <small>{t("delete")}</small>
                    </button>
                    <SettingEditUpdateModal
                      param={item}
                      value={setting[item]}
                      fetch={fetch}
                    />
                  </div>
                  <div className="setting__list__item__param">
                    <small>{t("c-name")}</small>
                    <h4>{item}</h4>
                  </div>
                  <div className="setting__list__item__param">
                    <small>{t("c-value")}</small>
                    <h4>{setting[item]}</h4>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Control;
