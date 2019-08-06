import React, { useState } from 'react';

export const AnimationContext = React.createContext();

export const AnimationProvider = (props) => {

    function handleCloseMenuClick() {
        setAsideAnimation((state) => {
            return {
                closeMenu: !state.closeMenu,
                rotateBtn: !state.rotateBtn,
                translateContent: !state.translateContent
            };
        });
    }

    const [asideAnimation, setAsideAnimation] = useState({
        closeMenu: false,
        rotateBtn: false,
        translateContent: false,
    });

    return (
        <AnimationContext.Provider value={{asideAnimation, handleCloseMenuClick}}>
            { props.children }
        </AnimationContext.Provider>
    );
}