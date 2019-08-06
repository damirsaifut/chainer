import React from 'react';

function Tab({ name, children, type }) {
  return (
    <div id={`${name}`} className="tabs__tab">
      {children}
    </div>
  )
}

export default Tab;