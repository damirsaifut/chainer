import React, { useState } from "react";
import { ls } from "services/ls";
import i18n from "services/i18n";
import Ping from "services/ping";

function Header() {
  const defaultLanguage = ls.locale.get() || "ru";

  const [local, setLocal] = useState(defaultLanguage);

  function changeLanguage(evt) {
    const lng = evt.target.value.toLowerCase();

    i18n.changeLanguage(lng);
    ls.locale.set(lng);
    setLocal(lng);
  }

  return (
    <header className="header">
      <div className="header-leftside">
        <div className="header-logo">
          <div
            className="svg sidebar__img"
            dangerouslySetInnerHTML={{
              __html: require("assets/img/bitcoin-logo.svg")
            }}
          />
          {/* <div
            className="svg sidebar__img"
            dangerouslySetInnerHTML={{ __html: require("assets/img/ltc.svg") }}
          /> */}
          {/* <div
            className="svg sidebar__img"
            dangerouslySetInnerHTML={{ __html: require("assets/img/dash.svg") }}
          /> */}
          {/* <div
            className="svg sidebar__img"
            dangerouslySetInnerHTML={{
              __html: require("assets/img/zcash.svg")
            }}
          /> */}
          <div className="name_chainer">
            <span>Bitcoin chainer</span>
            {/* <span>Litecoin chainer</span> */}
            {/* <span>Dash chainer</span> */}
            {/* <span>Zcash chainer</span> */}
            <div className="web-version"> v 1.0.0.9</div>
          </div>
        </div>
      </div>
      <div className="header-rightside">
        <select
          className="select-language"
          onChange={changeLanguage}
          value={ls.locale.get() || "ru"}
        >
          <option className="russian" value="ru">
            RU
          </option>
          <option className="english" value="en">
            EN
          </option>
        </select>
        <div className="ping-block">
          <Ping />
        </div>
      </div>
    </header>
  );
}

export default Header;
