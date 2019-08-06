import React, { useState } from "react";
import Tab from "./tab";
import TabList from "./tabs-list";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const Tabs = ({ children, selectedTab, onChangeTab, type }) => {
  let tabProps = [];
  const [query, setQuery] = useState("");

  const content = React.Children.map(children, child => {
    if (child.type === Tab) {
      const { title, name, type } = child.props;
      tabProps.push({ title, name, type });
      // По умолчанию показывает первый таб
      if (
        selectedTab ? selectedTab !== child.props.name : tabProps.length !== 1
      ) {
        return null;
      }
    }
    return child;
  });

  const finalSelectedTab =
    selectedTab || (tabProps.length > 0 && tabProps[0].name);

  return (
    <>
      <div className="tabs">
        <div className="tabs__list-block">
          {/* <div className="tabs__list-header query">
                    <h3 onClick={() => setQuery("query")} className="tabs__header">Запросы</h3>
                </div> */}
          <TabList
            selectedTab={finalSelectedTab}
            onChangeTab={onChangeTab}
            tabs={tabProps}
            type={type}
          />
        </div>
        <div className="tabs__content-block">{content}</div>
      </div>
    </>
  );
};

export default Tabs;
