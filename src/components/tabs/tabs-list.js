import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { AnimationContext } from "context/with-animation-context";


function TabList({ tabs, selectedTab, onChangeTab, type }) {
  const [query, setQuery] = useState("query");
  const linkClass = selected => {
    const c = 'tabs__link'
    return selected ? `${c} ${c}--selected` : c
  }


  return (
    <>
      <div className="tabs__list-header">
        <h3 onClick={() => setQuery("query")} className="tabs__header query">Запросы</h3>
      </div>
      <CSSTransition
        in={query == "query" ? true : false}
        appear={true}
        timeout={0}
        classNames="fade"
      >
        <ul className="tabs__list">
          {tabs.map(({ name, title, type }) => {
            if (type === "query" && query == "query")
              return (
                <CSSTransition
                  // in={true}
                  timeout={100}
                  classNames="fade"
                  key={name}
                >
                  <li aria-selected={name === selectedTab} role="tab" >
                    <a
                      className={linkClass(name === selectedTab)}
                      onClick={() => onChangeTab(name)}
                    >
                      {title}
                    </a>
                  </li>
                </CSSTransition>)

          })}

        </ul>
      </CSSTransition>

      <div className="tabs__list-header">
        <h3 onClick={() => setQuery("callback")} className="tabs__header">Callback</h3>
      </div>
      <CSSTransition
        in={query == "callback" ? true : false}
        timeout={0}
        classNames="fade"
      >
        <ul className="tabs__list">
          {tabs.map(({ name, title, type }) => {
            if (type === "callback" && query == "callback")
              return (
                <li aria-selected={name === selectedTab} role="tab" key={name}>
                  <a
                    className={linkClass(name === selectedTab)}
                    onClick={() => onChangeTab(name)}
                  >
                    {title}
                  </a>
                </li>)
          })}

        </ul>
      </CSSTransition>
    </>
  )
}

export default TabList;